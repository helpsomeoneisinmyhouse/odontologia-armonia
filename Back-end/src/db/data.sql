-- ============================================================
-- SCHEMA PARA ODONTOLOGÍA (SQLite)
-- ============================================================
-- NOTA: Este archivo es referencia. La inicialización real
-- se hace automáticamente desde src/db/db.js al arrancar.
-- ============================================================

CREATE TABLE IF NOT EXISTS "rol" (
  id_rol    INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre_rol TEXT NOT NULL,
  desc_rol   TEXT,
  logic_rol  TEXT DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS "user" (
  id_user    INTEGER PRIMARY KEY AUTOINCREMENT,
  name_user  TEXT NOT NULL,
  email_user TEXT NOT NULL,
  key_user   TEXT NOT NULL,
  fk_rol     INTEGER REFERENCES "rol"(id_rol),
  logic_user TEXT DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS "paciente" (
  id_paciente    INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_user        INTEGER REFERENCES "user"(id_user),
  name_paciente  TEXT NOT NULL,
  genre_paciente TEXT,
  birth_paciente TEXT,
  dir_paciente   TEXT,
  telf_paciente  TEXT,
  logic_paciente TEXT DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS "citas" (
  id_citas    INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_paciente INTEGER REFERENCES "paciente"(id_paciente),
  fk_doctor   INTEGER,
  date_cita   TEXT,
  time_cita   TEXT,
  desc_cita   TEXT,
  status_cita TEXT,
  logic_cita  TEXT DEFAULT 'A'
);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO "rol" (nombre_rol, desc_rol, logic_rol) VALUES
  ('Administrador', 'Acceso total al sistema', 'A'),
  ('Doctor', 'Gestión de citas y pacientes', 'A'),
  ('Asistente', 'Apoyo administrativo', 'A'),
  ('Paciente', 'Acceso a sus propias citas', 'A');

INSERT INTO "user" (name_user, email_user, key_user, fk_rol, logic_user) VALUES
  ('Admin Marcos', 'admin@odontologia.com', 'admin123', 1, 'A'),
  ('Dr. García', 'dr.garcia@odontologia.com', 'doc123', 2, 'A'),
  ('Asistente Laura', 'laura@odontologia.com', 'asis123', 3, 'A');

INSERT INTO "paciente" (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) VALUES
  (1, 'Juan Pérez', 'M', '1990-05-15', 'Av. Principal 123', '555-0101', 'A'),
  (2, 'María López', 'F', '1985-08-22', 'Calle Secundaria 456', '555-0102', 'A'),
  (1, 'Carlos Ruiz', 'M', '1978-11-03', 'Boulevard Central 789', '555-0103', 'A');

INSERT INTO "citas" (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) VALUES
  (1, 2, '2025-07-20', '10:00', 'Limpieza dental', 'Pendiente', 'A'),
  (2, 2, '2025-07-21', '14:30', 'Revisión general', 'Confirmada', 'A'),
  (3, 2, '2025-07-22', '09:00', 'Extracción de muela', 'Pendiente', 'A');
