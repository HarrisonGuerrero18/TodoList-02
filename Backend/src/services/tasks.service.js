import { prisma } from "../db/queries.js";

export async function getTasks(userId) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

export async function createTask(userId, { title, description }) {
  return prisma.task.create({
    data: {
      title,
      description,
      userId
    }
  });
}

export async function updateTask(userId, taskId, data) {
  // Validar que la tarea es del usuario
  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!task || task.userId !== userId) {
    throw new Error("No tienes permiso para modificar esta tarea");
  }

  return prisma.task.update({
    where: { id: Number(taskId) },
    data
  });
}

export async function deleteTask(userId, taskId) {
  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!task || task.userId !== userId) {
    throw new Error("No tienes permiso para borrar esta tarea");
  }

  return prisma.task.delete({
    where: { id: Number(taskId) }
  });
}
