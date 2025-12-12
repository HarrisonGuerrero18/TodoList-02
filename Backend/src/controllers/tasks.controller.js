import * as TaskService from "../services/tasks.service.js";

export async function getAll(req, res) {
  try {
    const tasks = await TaskService.getTasks(req.usuario_id);
    res.json(tasks);
  } catch (err) {
    console.error("Error en getAll:", err.message);
    res.status(500).json({ error: err.message });
  }
}

export async function create(req, res) {
  try {
    const task = await TaskService.createTask(req.usuario_id, req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error en create:", err.message);
    res.status(400).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const task = await TaskService.updateTask(
      req.usuario_id,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (err) {
    console.error("Error en update:", err.message);
    res
      .status(err.message.includes("permiso") ? 403 : 400)
      .json({ error: err.message });
  }
}

export async function remove(req, res) {
  try {
    await TaskService.deleteTask(req.usuario_id, req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    console.error("Error en remove:", err.message);
    res
      .status(err.message.includes("permiso") ? 403 : 400)
      .json({ error: err.message });
  }
}
