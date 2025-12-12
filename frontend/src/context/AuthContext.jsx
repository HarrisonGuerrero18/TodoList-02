import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setUser({ username: "Usuario autenticado" });
    }
  }, []);

  // =========================
  // LOGIN
  // =========================

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const login = async (username, contrasenia) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/auth/login`, { // Esta línea es la que aparece como error en la consola del navegador al iniciar sesión
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, contrasenia }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Credenciales incorrectas");
        return;
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success("Login exitoso");
      navigate("/todo-list");
    } catch (err) {
      toast.error("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ nombre, username, contrasenia }) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/auth/register`, {  // Esta línea es la que aparece como error en la consola del navegador al registrarme
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, username, contrasenia }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Error registrando usuario"); // Este mensaje se está mostrando en pantalla al dar click en registrar 
        return;
      }
      toast.success("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      toast.error("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
