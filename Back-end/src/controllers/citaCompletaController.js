const { json } = require('express');
const pool = require('../db/db');

exports.createCitaCompleta = async (req, res) => {
  const { 
    name_user, email_user, key_user, fk_rol, logic_user, 
    name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente,
    fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita 
  } = req.body;

  // se crea un cliente dedicaco
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // crear nuevo usuario
    const userResult = await client.query(
      `INSERT INTO general.user (name_user, email_user, key_user, fk_rol, logic_user) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name_user, email_user, key_user, fk_rol, logic_user]
    ); 
    const fk_user = userResult.rows[0].id_user; //FK_USER PA LOS PACIENTES 

    // crear nuevo cliente
    const pacienteResult = await client.query(
      `INSERT INTO general.paciente (fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fk_user, name_paciente, genre_paciente, birth_paciente, dir_paciente, telf_paciente, logic_paciente]
    );
    const fk_paciente = pacienteResult.rows[0].id_paciente; // FK_PACIENTE PA LAS CITAS

    // crear nueva cita
    const citaResult = await client.query(
      `INSERT INTO general.citas (fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fk_paciente, fk_doctor, date_cita, time_cita, desc_cita, status_cita, logic_cita]
    );

    await client.query('COMMIT');

    res.status(201).json(citaResult.rows[0]);

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

exports.getCitasCompletas = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const citadoResult = await client.query(`
      SELECT * FROM general.paciente
      INNER JOIN general.citas ON general.paciente.id_paciente = general.citas.fk_paciente
      LEFT JOIN general.user ON general.paciente.fk_user = general.user.id_user
      WHERE general.citas.logic_cita = 'A'
      ORDER BY general.citas.date_cita DESC
    `);

    await client.query('COMMIT');

    res.status(200).json(citadoResult.rows);

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};












exports.UpdateSatusCita = async (req,res) => {
  const { id } = req.params;
  const { status_cita } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.citas SET status_cita = $1 WHERE id_citas = $2 RETURNING *',
      [ status_cita, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

exports.UpdateDateCita = async (req,res) => {
  const { id } = req.params;
  const { date_cita } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.citas SET date_cita = $1 WHERE id_citas = $2 RETURNING *',
      [ date_cita, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

exports.logicCita = async (req,res) => {
  const { id } = req.params;
  const { logic_cita } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.citas SET logic_cita = $1 WHERE id_citas = $2 RETURNING *',
      [ logic_cita, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'notes not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}





    /*
      id: id_cita
      title : fk_name_paciente
      start: date_cita
      end : date_cita + time_cita de alguna forma
      description: desc_cita
      sexo: genre_paciente
      birth: birth_paciente
      direccion_paciente: dir_paciente
      telefono: telf_paciente
      status : status_cita
   */
