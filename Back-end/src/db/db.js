const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// ---------------------------------------------------------------------------
// Inicialización lazy (sql.js necesita una carga async de WASM)
// ---------------------------------------------------------------------------

const DB_PATH = path.resolve(process.env.DB_PATH || path.join(__dirname, '../../odontologia.db'));

let db = null;
let initPromise = null;

async function ensureDb() {
  if (db) return db;
  if (!initPromise) {
    initPromise = initSqlJs();
  }
  const SQL = await initPromise;

  // Cargar DB existente o crear nueva
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA journal_mode = WAL');
  db.run('PRAGMA foreign_keys = ON');

  initDatabase();

  return db;
}

// ---------------------------------------------------------------------------
// Helpers de normalización de SQL
// ---------------------------------------------------------------------------

function normalizeSQL(sql) {
  return sql
    .replace(/general\./g, '')     // Sacamos el schema "general"
    .replace(/\$(\d+)/g, '?');      // $N → ? (placeholders SQLite)
}

function isSelect(sql) {
  return /^\s*SELECT\b/i.test(sql);
}

function isBegin(sql) {
  return /^\s*BEGIN\b/i.test(sql);
}

function isCommit(sql) {
  return /^\s*COMMIT\b/i.test(sql);
}

function isRollback(sql) {
  return /^\s*ROLLBACK\b/i.test(sql);
}

function isDML(sql) {
  return /^\s*(INSERT|UPDATE|DELETE)\b/i.test(sql);
}

// Mapa de tablas → columna PK
const PK_MAP = {
  rol:      'id_rol',
  user:     'id_user',
  paciente: 'id_paciente',
  citas:    'id_citas',
};

function getLastInsertRowid(database) {
  const result = database.exec('SELECT last_insert_rowid()');
  return result[0]?.values[0]?.[0] || 0;
}

function extractTableFromDML(sql) {
  const patterns = [
    /INSERT\s+INTO\s+(?:general\.)?(\w+)/i,
    /UPDATE\s+(?:general\.)?(\w+)/i,
    /DELETE\s+FROM\s+(?:general\.)?(\w+)/i,
  ];
  for (const p of patterns) {
    const m = sql.match(p);
    if (m) return m[1];
  }
  return null;
}

function resolveReturningRow(database, sql, params) {
  // Estrategia: para INSERT tomamos last_insert_rowid(),
  // para UPDATE/DELETE tomamos el último parámetro (asumimos que es el PK).
  const table = extractTableFromDML(sql);
  if (!table) return [];

  const pk = PK_MAP[table.toLowerCase()];
  if (!pk) return [];

  let pkValue;

  if (/^\s*INSERT\b/i.test(sql)) {
    const rowidResult = database.exec('SELECT last_insert_rowid()');
    pkValue = rowidResult[0]?.values[0]?.[0];
  } else {
    // UPDATE / DELETE → el último parámetro es el valor del PK
    pkValue = params.length > 0 ? params[params.length - 1] : null;
  }

  if (pkValue == null) return [];

  const stmt = database.prepare(`SELECT * FROM "${table}" WHERE "${pk}" = ?`);
  stmt.bind([pkValue]);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// ---------------------------------------------------------------------------
// Pool wrapper — imita pg.Pool para que los controladores NO cambien
// ---------------------------------------------------------------------------

const pool = {
  async query(text, params = []) {
    const database = await ensureDb();
    const sql = normalizeSQL(text);
    const hasReturning = /\bRETURNING\s+\*/i.test(sql);
    const cleanSql = hasReturning ? sql.replace(/\s+RETURNING\s+\*/i, '') : sql;

    // ── SELECT ────────────────────────────────────────────────
    if (isSelect(sql)) {
      if (params.length === 0) {
        // Sin parámetros → db.exec() devuelve array de { columns, values }
        const results = database.exec(sql);
        const rows = results.flatMap(r =>
          r.values.map(v => {
            const obj = {};
            r.columns.forEach((col, i) => { obj[col] = v[i]; });
            return obj;
          })
        );
        return { rows };
      }

      // Con parámetros → prepared statement
      const stmt = database.prepare(sql);
      stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return { rows };
    }

    // ── BEGIN / COMMIT / ROLLBACK ─────────────────────────────
    if (isBegin(sql)) {
      database.exec('BEGIN');
      return { rows: [] };
    }
    if (isCommit(sql)) {
      database.exec('COMMIT');
      return { rows: [] };
    }
    if (isRollback(sql)) {
      database.exec('ROLLBACK');
      return { rows: [] };
    }

    // ── INSERT / UPDATE / DELETE ──────────────────────────────
    // Para DELETE necesitamos capturar la fila ANTES de borrarla
    let deletedRows = [];
    if (hasReturning && /^\s*DELETE\b/i.test(sql)) {
      const table = extractTableFromDML(sql);
      const pk = table ? PK_MAP[table.toLowerCase()] : null;
      const pkValue = params.length > 0 ? params[params.length - 1] : null;
      if (table && pk && pkValue != null) {
        const stmt = database.prepare(`SELECT * FROM "${table}" WHERE "${pk}" = ?`);
        stmt.bind([pkValue]);
        while (stmt.step()) deletedRows.push(stmt.getAsObject());
        stmt.free();
      }
    }

    database.run(cleanSql, params);
    
    // ── CON RETURNING * ───────────────────────────────────────
    if (hasReturning) {
      if (/^\s*DELETE\b/i.test(sql)) {
        return { rows: deletedRows };
      }
      const rows = resolveReturningRow(database, sql, params);
      return { rows };
    }

    // ── Sin RETURNING ─────────────────────────────────────────
    return {
      rows: [],
      changes: database.getRowsModified(),
      lastInsertRowid: getLastInsertRowid(database),
    };
  },

  async connect() {
    const database = await ensureDb();
    return {
      async query(text, params = []) {
        return pool.query(text, params);
      },
      release() {
        // No-op para SQLite
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Inicialización del schema y datos semilla
// ---------------------------------------------------------------------------

function initDatabase() {
  if (!db) return;

  db.run(`
    CREATE TABLE IF NOT EXISTS "rol" (
      id_rol     INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_rol TEXT NOT NULL,
      desc_rol   TEXT,
      logic_rol  TEXT DEFAULT 'A'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "user" (
      id_user    INTEGER PRIMARY KEY AUTOINCREMENT,
      name_user  TEXT NOT NULL,
      email_user TEXT NOT NULL,
      key_user   TEXT NOT NULL,
      fk_rol     INTEGER REFERENCES "rol"(id_rol),
      logic_user TEXT DEFAULT 'A'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "paciente" (
      id_paciente    INTEGER PRIMARY KEY AUTOINCREMENT,
      fk_user        INTEGER REFERENCES "user"(id_user),
      name_paciente  TEXT NOT NULL,
      genre_paciente TEXT,
      birth_paciente TEXT,
      dir_paciente   TEXT,
      telf_paciente  TEXT,
      logic_paciente TEXT DEFAULT 'A'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "citas" (
      id_citas    INTEGER PRIMARY KEY AUTOINCREMENT,
      fk_paciente INTEGER REFERENCES "paciente"(id_paciente),
      fk_doctor   INTEGER,
      date_cita   TEXT,
      time_cita   TEXT,
      desc_cita   TEXT,
      status_cita TEXT,
      logic_cita  TEXT DEFAULT 'A'
    )
  `);

  // Seed data — solo si la tabla "rol" está vacía
  const countStmt = db.exec('SELECT COUNT(*) AS cnt FROM "rol"');
  const count = countStmt[0]?.values[0]?.[0] || 0;

  if (count === 0) {
    db.run(`INSERT INTO "rol" (nombre_rol, desc_rol, logic_rol) VALUES (?, ?, ?)`, ['Administrador', 'Acceso total al sistema', 'A']);
    db.run(`INSERT INTO "rol" (nombre_rol, desc_rol, logic_rol) VALUES (?, ?, ?)`, ['Doctor', 'Gestión de citas y pacientes', 'A']);
    db.run(`INSERT INTO "rol" (nombre_rol, desc_rol, logic_rol) VALUES (?, ?, ?)`, ['Asistente', 'Apoyo administrativo', 'A']);
    db.run(`INSERT INTO "rol" (nombre_rol, desc_rol, logic_rol) VALUES (?, ?, ?)`, ['Paciente', 'Acceso a sus propias citas', 'A']);

    db.run(`INSERT INTO "user" (name_user, email_user, key_user, fk_rol, logic_user) VALUES (?, ?, ?, ?, ?)`, ['Admin Marcos', 'admin@odontologia.com', 'admin123', 1, 'A']);
    db.run(`INSERT INTO "user" (name_user, email_user, key_user, fk_rol, logic_user) VALUES (?, ?, ?, ?, ?)`, ['Dr. García', 'dr.garcia@odontologia.com', 'doc123', 2, 'A']);
    db.run(`INSERT INTO "user" (name_user, email_user, key_user, fk_rol, logic_user) VALUES (?, ?, ?, ?, ?)`, ['Asistente Laura', 'laura@odontologia.com', 'asis123', 3, 'A']);

    db.run(`INSERT INTO "paciente" (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) VALUES (?, ?, ?, ?, ?, ?, ?)`, [1, 'Juan Pérez', 'M', '1990-05-15', 'Av. Principal 123', '555-0101', 'A']);
    db.run(`INSERT INTO "paciente" (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) VALUES (?, ?, ?, ?, ?, ?, ?)`, [2, 'María López', 'F', '1985-08-22', 'Calle Secundaria 456', '555-0102', 'A']);
    db.run(`INSERT INTO "paciente" (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) VALUES (?, ?, ?, ?, ?, ?, ?)`, [1, 'Carlos Ruiz', 'M', '1978-11-03', 'Boulevard Central 789', '555-0103', 'A']);

    db.run(`INSERT INTO "citas" (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) VALUES (?, ?, ?, ?, ?, ?, ?)`, [1, 2, '2025-07-20', '10:00', 'Limpieza dental', 'Pendiente', 'A']);
    db.run(`INSERT INTO "citas" (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) VALUES (?, ?, ?, ?, ?, ?, ?)`, [2, 2, '2025-07-21', '14:30', 'Revisión general', 'Confirmada', 'A']);
    db.run(`INSERT INTO "citas" (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) VALUES (?, ?, ?, ?, ?, ?, ?)`, [3, 2, '2025-07-22', '09:00', 'Extracción de muela', 'Pendiente', 'A']);

    // Persistir a disco
    saveDatabase();
    console.log('✅ Base de datos inicializada con datos de semilla');
  }
}

// ---------------------------------------------------------------------------
// Persistencia a disco
// ---------------------------------------------------------------------------

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// ---------------------------------------------------------------------------
// Auto-persistencia: guardar cada 5s y al cerrar
// ---------------------------------------------------------------------------

setInterval(() => saveDatabase(), 5000);

process.on('exit', () => saveDatabase());
process.on('SIGINT', () => { saveDatabase(); process.exit(); });
process.on('SIGTERM', () => { saveDatabase(); process.exit(); });

module.exports = pool;
