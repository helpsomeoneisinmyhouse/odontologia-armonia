const pool = require('../db/db');

// Obtener todas las cartass
exports.getCitas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM general.citas ORDER BY id_citas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cartas por ID
exports.getCitaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM general.citas WHERE id_citas = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva cartas
exports.createCita = async (req, res) => {
  const { fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita } = req.body;
  
  //fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita
  try {
    const result = await pool.query(
      'INSERT INTO general.citas (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [ fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una cartas existente
exports.updateCita = async (req, res) => {
  const { id } = req.params;
  const { fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.citas SET fk_paciente = $1, fk_doctor = $2, date_cita = $3, time_cita = $4, desc_cita = $5, status_cita = $6, logic_cita = $7 WHERE id_citas = $8 RETURNING *',
      [ fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita , id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una cartas
exports.deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM general.citas WHERE id_citas = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json({ message: 'notes deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
