// src/services/task.service.js
import { pool } from "../db/connection.js";

export async function getTasks(userId) {
  const result = await pool.query(
    "SELECT * FROM tareas WHERE usuario_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

export async function createTask(userId, { title, description }) {
  const result = await pool.query(
    `INSERT INTO tareas (titulo, descripcion, usuario_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, description, userId]
  );
  return result.rows[0];
}

export async function updateTask(userId, taskId, data) {
  // Validar que la tarea es del usuario
  const taskQuery = await pool.query(
    "SELECT * FROM tareas WHERE id = $1",
    [Number(taskId)]
  );

  const task = taskQuery.rows[0];

  if (!task || task.usuario_id !== userId) {
    throw new Error("No tienes permiso para modificar esta tarea");
  }

  // Construir la consulta de actualización dinámicamente
  const updates = [];
  const values = [];
  let paramCounter = 1;

  if (data.title !== undefined) {
    updates.push(`titulo = $${paramCounter}`);
    values.push(data.title);
    paramCounter++;
  }

  if (data.description !== undefined) {
    updates.push(`descripcion = $${paramCounter}`);
    values.push(data.description);
    paramCounter++;
  }

  if (data.completed !== undefined) {
    updates.push(`completada = $${paramCounter}`);
    values.push(data.completed);
    paramCounter++;
  }

  values.push(Number(taskId));

  const result = await pool.query(
    `UPDATE tareas SET ${updates.join(", ")} WHERE id = $${paramCounter} RETURNING *`,
    values
  );

  return result.rows[0];
}

export async function deleteTask(userId, taskId) {
  // Validar que la tarea es del usuario
  const taskQuery = await pool.query(
    "SELECT * FROM tareas WHERE id = $1",
    [Number(taskId)]
  );

  const task = taskQuery.rows[0];

  if (!task || task.usuario_id !== userId) {
    throw new Error("No tienes permiso para borrar esta tarea");
  }

  await pool.query("DELETE FROM tareas WHERE id = $1", [Number(taskId)]);

  return { message: "Tarea eliminada exitosamente" };
}