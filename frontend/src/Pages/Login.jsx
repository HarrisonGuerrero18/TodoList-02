import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !contrasenia.trim()) {
      return; 
    }

    await login(username, contrasenia); // Línea señalada como error en la consola del navegador al iniciar sesión
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold text-center">LOGIN PAGE</h2>

        <label className="font-semibold" htmlFor="username">
          Username:
        </label> 
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          className="border border-gray-300 rounded p-2"
          type="text"
          id="username"
        />

        <label className="font-semibold" htmlFor="contrasenia">
          Contraseña:
        </label>
        <input
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          className="border border-gray-300 rounded p-2"
          type="password"
          id="contrasenia"
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white rounded p-2 disabled:bg-blue-300"
          type="submit"
        >
          {loading ? "Cargando..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/register" className="text-blue-500 underline">
          ¿No tienes cuenta? Regístrate
        </Link>
      </div>
    </div>
  );
}
