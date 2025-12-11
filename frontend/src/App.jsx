// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./Pages/Login.jsx";
import ToDoList from "./components/ToDoList.jsx";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register.jsx";

// ==========================
//  RUTA PROTEGIDA
// ==========================
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// ==========================
//  APP PRINCIPAL
// ==========================
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} /> {/*Línea señalada como error en la consola del navegador al iniciar sesión*/}
        <Route path="/register" element={<Register />} /> {/*Línea señalada como error en la consola del navegador al registrarme*/}
        <Route
          path="/todo-list"
          element={
            <PrivateRoute>
              <ToDoList />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}
