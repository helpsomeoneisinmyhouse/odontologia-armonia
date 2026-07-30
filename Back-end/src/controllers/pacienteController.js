const pool = require('../db/db');

// Obtener todas las cartass
exports.getPacientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM general.paciente ORDER BY id_paciente');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cartas por ID
exports.getPacienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM general.paciente WHERE id_paciente = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'pacientes no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva cartas
exports.createPaciente = async (req, res) => {
  const { fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente } = req.body;
  
  //fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente
  try {
    const result = await pool.query(
      'INSERT INTO general.paciente (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [ fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una cartas existente
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.paciente SET fk_user = $1, name_paciente = $2, genre_paciente = $3, birth_paciente = $4, dir_paciente = $5, telf_paciente = $6, logic_paciente = $7 WHERE id_paciente = $8 RETURNING *',
      [ fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente , id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'pacientes no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una cartas
exports.deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM general.paciente WHERE id_paciente = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'paciente no encontrado' });
    }
    res.json({ message: 'paciente borrado exitosamente!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
