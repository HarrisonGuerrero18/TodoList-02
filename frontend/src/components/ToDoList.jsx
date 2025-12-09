import useToDoList from "../hooks/useToDoList";
import "../index.css";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { useRef } from "react";
import { FaReact } from "react-icons/fa";

export default function ToDoList() {
  const {
    tasks,
    newTask,
    setNewTask,
    addTask,
    deleteTask,
    updateTask,
    toggleCompleted,
  } = useToDoList();
  const inputRef = useRef(null);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 shadow-md rounded-lg">
      <a href="https://es.react.dev/" target="_blank" rel="noopener noreferrer">
        <FaReact className="text-4xl mb-4 mx-auto cursor-pointer hover:scale-110" />
      </a>

      <h1 className="text-xl font-semibold mb-4 text-center uppercase font-sans">
        Lista de Tareas
      </h1>
      <div className="flex items-center mb-4">
        <CiBoxList
          className="mr-2 text-2xl cursor-pointer hover:text-blue-400"
          onClick={() => {
            inputRef.current?.focus();
          }}
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
          onClick={addTask}
        >
          Agregar tarea
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border border-gray-200 rounded-lg shadow-md ${
              task.completed
                ? "bg-green-100 line-through hover:bg-green-200"
                : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className="mr-2 cursor-pointer hover:bg-gray-500"
              />
              <span>{task.text}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => deleteTask(task.id)}
                className="flex-1 px-3 py-2 cursor-pointer bg-red-500 text-white rounded-lg border border-red-500 hover:bg-red-600"
              >
                <FaTrashAlt />
              </button>

              <button
                onClick={() => {
                  let newText = prompt("Nuevo texto:", task.text);

                  while (newText !== null && newText.trim() === "") {
                    newText = prompt(
                      "El texto no puede estar vacío. Ingrese de nuevo:",
                      task.text
                    );
                  }

                  if (newText !== null) {
                    updateTask(task.id, newText);
                  }
                }}
                className="flex-1 px-3 py-2 cursor-pointer bg-green-500 text-white rounded-lg border border-green-500 hover:bg-green-600"
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
