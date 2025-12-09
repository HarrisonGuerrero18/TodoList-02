// src/services/auth.service.js
import { pool } from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser({ username, email, password }) {
  // Verificar si ya existe el usuario
  const existsQuery = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1 OR username = $2",
    [email, username]
  );

  if (existsQuery.rows.length > 0) {
    throw new Error("El usuario o correo ya está registrado");
  }

  // Encriptar contraseña
  const hashed = await bcrypt.hash(password, 10);

  // Crear usuario
  const result = await pool.query(
    `INSERT INTO usuarios (username, email, password)
     VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
    [username, email, hashed]
  );

  return result.rows[0];
}

export async function loginUser({ email, password }) {
  // Buscar usuario por email
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) throw new Error("Credenciales incorrectas");

  // Verificar contraseña
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Credenciales incorrectas");

  // Crear token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Remover password del objeto user antes de devolverlo
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}