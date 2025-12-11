import * as AuthService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { nombre, username, contrasenia } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !username || !contrasenia) {
      return res.status(400).json({ 
        error: "Faltan campos requeridos: nombre, username, contrasenia" 
      });
    }

    const user = await AuthService.registerUser({ nombre, username, contrasenia });

    return res.json({
      message: "Usuario registrado con éxito",
      user
    });
  } catch (err) {
    console.error("Error en registro:", err.message);
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { username, contrasenia } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!username || !contrasenia) {
      return res.status(400).json({ 
        error: "Faltan campos requeridos: username, contrasenia" 
      });
    }

    const data = await AuthService.loginUser({ username, contrasenia });

    return res.json(data);
  } catch (err) {
    console.error("Error en login:", err.message);
    return res.status(400).json({ error: err.message });
  }
}
