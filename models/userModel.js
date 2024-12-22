const pool = require("../config/db");

// Registrar un nuevo usuario
const registerUser = async ({ email, password, rol, lenguage }) => {
  const query = `
    INSERT INTO usuarios (email, password, rol, lenguage) 
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [email, password, rol, lenguage];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM usuarios WHERE email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = { registerUser, getUserByEmail };
