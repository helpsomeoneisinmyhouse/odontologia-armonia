const pool = require('../db/db');

// Obtener todas las cartass
exports.getRols = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM general.rol ORDER BY id_rol');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cartas por ID
exports.getRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM general.rol WHERE id_rol = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'roles no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva cartas
exports.createRol = async (req, res) => {
  const { nombre_rol, desc_rol, logic_rol } = req.body;
  
  //nombre_rol, desc_rol, logic_rol
  try {
    const result = await pool.query(
      'INSERT INTO general.rol (nombre_rol, desc_rol, logic_rol) VALUES ($1, $2, $3) RETURNING *',
      [ nombre_rol, desc_rol, logic_rol ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una cartas existente
exports.updateRol = async (req, res) => {
  const { id } = req.params;
  const { nombre_rol, desc_rol, logic_rol } = req.body;
  try {
    const result = await pool.query(
      'UPDATE general.rol SET nombre_rol = $1, desc_rol = $2, logic_rol = $3 WHERE id_rol = $4 RETURNING *',
      [ nombre_rol, desc_rol, logic_rol , id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'role no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una cartas
exports.deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM general.rol WHERE id_rol = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'rol no encontrado' });
    }
    res.json({ message: 'rol borrado exitosamente!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
