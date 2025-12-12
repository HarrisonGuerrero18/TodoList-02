import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/config";

export function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `${API_URL}/tasks`;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error cargando tareas:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function add(titulo) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo }),
    });

    const newTask = await res.json();
    setTasks((prev) => [newTask, ...prev]);
  }

  async function toggle(id, completada) {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completada }),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t.tarea_id === id ? updated : t))
    );
  }

  async function update(id, titulo) {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo }),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t.tarea_id === id ? updated : t))
    );
  }

  async function remove(id) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setTasks((prev) => prev.filter((t) => t.tarea_id !== id));
  }

  return {
    tasks,
    loading,
    add,
    toggle,
    update,
    remove,
  };
}
