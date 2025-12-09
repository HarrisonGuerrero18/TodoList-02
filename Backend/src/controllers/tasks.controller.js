import * as TaskService from "../services/tasks.service.js";

export async function getAll(req, res) {
  try {
    const tasks = await TaskService.getTasks(req.userId);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function create(req, res) {
  try {
    const task = await TaskService.createTask(req.userId, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const task = await TaskService.updateTask(
      req.userId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  try {
    await TaskService.deleteTask(req.userId, req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
