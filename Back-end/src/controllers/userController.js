const pool = require('../db/db');

// Obtener todas las cartass
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM general.user ORDER BY id_user');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cartas por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM general.user WHERE id_user = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'usuarios no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva cartas
exports.createUser = async (req, res) => {
  const { name_user, email_user, key_user, fk_rol, logic_user } = req.body;
  
  //name_user, email_user, key_user, fk_rol, logic_user
  try {
    const result = await pool.query(
      'INSERT INTO general.user (name_user, email_user, key_user, fk_rol, logic_user) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [ name_user, email_user, key_user, fk_rol, logic_user ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una cartas existente
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name_user, email_user, key_user, fk_rol, logic_user } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.user SET name_user = $1, email_user = $2, key_user = $3, fk_rol = $4, logic_user = $5 WHERE id_user = $6 RETURNING *',
      [ name_user, email_user, key_user, fk_rol, logic_user , id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'usuarios no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una cartas
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM general.user WHERE id_user = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'usuario no encontrado' });
    }
    res.json({ message: 'usuario borrado exitosamente!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
