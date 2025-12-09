// src/db/queries.js
import pool from "./connection.js"; // tu pool de conexión de PostgreSQL

// ======= USUARIOS =======

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const res = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
  return res.rows;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const res = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
  return res.rows[0];
};

// Crear un usuario
export const createUser = async ({ nombres, apellidos, tipo_documento, numero_documento }) => {
  const res = await pool.query(
    `INSERT INTO usuarios (nombres, apellidos, tipo_documento, numero_documento)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombres, apellidos, tipo_documento, numero_documento]
  );
  return res.rows[0];
};

// ======= TAREAS =======

// Obtener todas las tareas
export const getAllTasks = async () => {
  const res = await pool.query("SELECT * FROM tareas ORDER BY id ASC");
  return res.rows;
};

// Crear tarea
export const createTask = async ({ titulo, descripcion, usuario_id }) => {
  const res = await pool.query(
    `INSERT INTO tareas (titulo, descripcion, usuario_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [titulo, descripcion, usuario_id]
  );
  return res.rows[0];
};

// Actualizar tarea
export const updateTask = async (id, { titulo, descripcion, completada }) => {
  const res = await pool.query(
    `UPDATE tareas SET titulo=$1, descripcion=$2, completada=$3
     WHERE id=$4 RETURNING *`,
    [titulo, descripcion, completada, id]
  );
  return res.rows[0];
};

// Eliminar tarea
export const deleteTask = async (id) => {
  await pool.query("DELETE FROM tareas WHERE id=$1", [id]);
  return { message: "Tarea eliminada" };
};
