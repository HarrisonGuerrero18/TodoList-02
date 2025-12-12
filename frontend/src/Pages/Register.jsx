import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const { register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !username.trim() || !contrasenia.trim()) {
      return;
    }

    await register({ nombre, username, contrasenia });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold text-center">REGISTRO</h2>

        <label className="font-semibold">Nombre completo:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border border-gray-300 rounded p-2"
          type="text"
        />

        <label className="font-semibold">Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded p-2"
          type="text"
        />

        <label className="font-semibold">Contraseña:</label>
        <input
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          className="border border-gray-300 rounded p-2"
          type="password"
        />

        <button
          disabled={loading}
          className="bg-green-500 text-white rounded p-2 disabled:bg-green-300"
          type="submit"
        >
          {loading ? "Creando..." : "Registrarse"}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/login" className="text-blue-500 underline">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
}
