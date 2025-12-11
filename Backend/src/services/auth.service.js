import { pool } from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser({ nombre, username, contrasenia }) {
  try {
    // Validar que los campos no estén vacíos
    if (!nombre?.trim() || !username?.trim() || !contrasenia?.trim()) {
      throw new Error("Todos los campos son requeridos y no pueden estar vacíos");
    }

    const existsQuery = await pool.query(
      "SELECT * FROM usuario WHERE username = $1",
      [username]
    );

    if (existsQuery.rows.length > 0) {
      throw new Error("El usuario ya está registrado");
    }

    const hashed = await bcrypt.hash(contrasenia, 10);

    const result = await pool.query(
      `INSERT INTO usuario (nombre, username, contrasenia, creado_en)
       VALUES ($1, $2, $3, $4)
       RETURNING usuario_id, nombre, username`,
      [nombre, username, hashed, new Date()]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error en registerUser:", err.message);
    throw err;
  }
}

export async function loginUser({ username, contrasenia }) {
  try {
    // Validar que los campos no estén vacíos
    if (!username?.trim() || !contrasenia?.trim()) {
      throw new Error("Username y contraseña son requeridos");
    }

    const result = await pool.query(
      "SELECT * FROM usuario WHERE username = $1",
      [username]
    );

    const user = result.rows[0];

    if (!user) throw new Error("Credenciales incorrectas");

    const match = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!match) throw new Error("Credenciales incorrectas");

    const token = jwt.sign(
      { id: user.usuario_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    delete user.contrasenia;

    return { user, token };
  } catch (err) {
    console.error("Error en loginUser:", err.message);
    throw err;
  }
}
