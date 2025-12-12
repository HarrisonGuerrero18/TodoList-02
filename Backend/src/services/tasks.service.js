import { pool } from "../db/connection.js";

export async function getTasks(usuario_id) {
  const result = await pool.query(
    "SELECT * FROM tarea WHERE usuario_id = $1 ORDER BY creada_en DESC",
    [usuario_id]
  );
  return result.rows;
}

export async function createTask(usuario_id, { titulo, completada }) {
  if (!titulo || !titulo.trim()) {
    throw new Error("El título de la tarea es requerido");
  }

  const result = await pool.query(
    `INSERT INTO tarea (usuario_id, titulo, completada, actualizada_en)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [usuario_id, titulo.trim(), completada ?? false, new Date()]
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

  // Validar que al menos un campo sea actualizado
  if (!titulo && completada === undefined) {
    throw new Error("Debes proporcionar un título o estado de completitud");
  }

  const result = await pool.query(
    `UPDATE tarea 
     SET titulo=COALESCE($1, titulo), completada=COALESCE($2, completada), actualizada_en=$3
     WHERE tarea_id=$4
     RETURNING *`,
    [titulo ? titulo.trim() : null, completada, new Date(), tarea_id]
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
