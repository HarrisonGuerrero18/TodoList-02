import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/config";

export function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `${API_URL}/tasks`;

  // ==============================
  // CARGAR TAREAS
  // ==============================
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` },
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

  // ==============================
  // AGREGAR TAREA
  // ==============================
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

  // ==============================
  // TOGGLE (COMPLETADA)
  // ==============================
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
        prev.map((t) => (t.tarea_id === id ? updated : t))
      );
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  }

  // ==============================
  // ACTUALIZAR TÍTULO
  // ==============================
  async function update(id, titulo) {
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
    }
  }

  // ==============================
  // ELIMINAR TAREA
  // ==============================
  async function remove(id) {
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
