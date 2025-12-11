import { useRef, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import "../index.css";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { FaReact } from "react-icons/fa";

export default function ToDoList() {
  const { tasks, loading, add, toggle, remove, update } = useTasks();
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    add(newTask);
    setNewTask("");
  };

  if (loading)
    return <p className="text-center mt-10">Cargando tareas...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 shadow-md rounded-lg">
      <a href="https://es.react.dev/" target="_blank" rel="noopener noreferrer">
        <FaReact className="text-4xl mb-4 mx-auto cursor-pointer hover:scale-110" />
      </a>

      <h1 className="text-xl font-semibold mb-4 text-center uppercase font-sans">
        Lista de Tareas
      </h1>

      <form onSubmit={handleAdd} className="flex items-center mb-4">
        <CiBoxList
          className="mr-2 text-2xl cursor-pointer hover:text-blue-400"
          onClick={() => inputRef.current?.focus()}
        />

        <input
          type="text"
          placeholder="Nueva tarea"
          ref={inputRef}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />

        <button
          className="p-2 cursor-pointer bg-blue-500 text-white rounded-r-lg border border-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Agregar tarea
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.tarea_id}
            className={`flex items-center justify-between p-2 border border-gray-200 rounded-lg shadow-md ${
              task.completada
                ? "bg-green-100 line-through hover:bg-green-200"
                : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completada}
                onChange={(e) => toggle(task.tarea_id, e.target.checked)}
                className="mr-2 cursor-pointer"
              />
              <span>{task.titulo}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => remove(task.tarea_id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaTrashAlt />
              </button>

              <button
                onClick={() => {
                  let newText = prompt("Nuevo texto:", task.titulo);
                  if (newText && newText.trim()) update(task.tarea_id, newText);
                }}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <GrUpdate />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
