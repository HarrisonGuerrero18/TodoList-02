import { API_URL } from "./config";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  return res.json();
}

export async function createTask(data) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  return res.json();
}
