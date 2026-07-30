const pool = require('../db/db');

exports.login = async (req, res) => {
  const { email_user, key_user } = req.body;

  if (!email_user || !key_user) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const result = await pool.query(
      `SELECT u.id_user, u.name_user, u.email_user, u.fk_rol, r.nombre_rol,
              p.id_paciente, p.name_paciente, p.genre_paciente, p.birth_paciente, p.dir_paciente, p.telf_paciente
       FROM "user" u
       JOIN "rol" r ON u.fk_rol = r.id_rol
       LEFT JOIN "paciente" p ON u.id_user = p.fk_user
       WHERE u.email_user = $1 AND u.key_user = $2 AND u.logic_user = 'A'`,
      [email_user, key_user]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = result.rows[0];
    res.json({
      id_user: user.id_user,
      name_user: user.name_user,
      email_user: user.email_user,
      fk_rol: user.fk_rol,
      nombre_rol: user.nombre_rol,
      id_paciente: user.id_paciente,
      name_paciente: user.name_paciente,
      genre_paciente: user.genre_paciente,
      birth_paciente: user.birth_paciente,
      dir_paciente: user.dir_paciente,
      telf_paciente: user.telf_paciente
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
