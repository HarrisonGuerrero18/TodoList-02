import { useAuth } from "./context/AuthContext";
import ToDoList from "./components/ToDoList";

export default function App() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        logout
      </button>
      <ToDoList />
    </div>
  );
}