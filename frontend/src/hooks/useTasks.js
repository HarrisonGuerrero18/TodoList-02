import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/config";

export function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `${API_URL}/tasks`;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    async function load() {
      try {
        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || `Error ${res.status}`);
        }
        
        const data = await res.json();
        setTasks(data || []);
      } catch (err) {
        console.error("Error cargando tareas:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, API]);

  async function add(titulo) {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Error ${res.status}`);
      }

      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error("Error agregando tarea:", err);
    }
  }

  async function toggle(id, completada) {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completada }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Error ${res.status}`);
      }

      const updated = await res.json();
      setTasks((prev) =>
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Error ${res.status}`);
      }

      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.tarea_id === id ? updated : t))
      );
    } catch (err) {
      console.error("Error actualizando tarea:", err);
    }},
      body: JSON.stringify({ titulo }),
    });

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `Error ${res.status}`);
      }

      setTasks((prev) => prev.filter((t) => t.tarea_id !== id));
    } catch (err) {
      console.error("Error eliminando tarea:", err);
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
