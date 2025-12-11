import { pool } from "../db/connection.js";

export async function getTasks(usuario_id) {
  const result = await pool.query(
    "SELECT * FROM tarea WHERE usuario_id = $1 ORDER BY creado_en DESC",
    [usuario_id]
  );
  return result.rows;
}

export async function createTask(usuario_id, { titulo, completada }) {
  const result = await pool.query(
    `INSERT INTO tarea (usuario_id, titulo, completada, creado_en, actualizada_en)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [usuario_id, titulo, completada ?? false, new Date(), new Date()]
  );
  return result.rows[0];
}

export async function updateTask(usuario_id, tarea_id, { titulo, completada }) {
  // Validar dueño
  const q = await pool.query("SELECT * FROM tarea WHERE tarea_id = $1", [tarea_id]);
  const task = q.rows[0];

  if (!task || task.usuario_id !== usuario_id) {
    throw new Error("No tienes permiso para modificar esta tarea");
  }

  const result = await pool.query(
    `UPDATE tarea 
     SET titulo=$1, completada=$2, actualizada_en=$3
     WHERE tarea_id=$4
     RETURNING *`,
    [titulo, completada, new Date(), tarea_id]
  );

  return result.rows[0];
}

export async function deleteTask(usuario_id, tarea_id) {
  const q = await pool.query("SELECT * FROM tarea WHERE tarea_id = $1", [tarea_id]);
  const task = q.rows[0];

  if (!task || task.usuario_id !== usuario_id) {
    throw new Error("No tienes permiso para borrar esta tarea");
  }

  await pool.query("DELETE FROM tarea WHERE tarea_id = $1", [tarea_id]);
  return { message: "Tarea eliminada" };
}
