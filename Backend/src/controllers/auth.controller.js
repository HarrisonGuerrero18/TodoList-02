import * as AuthService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await AuthService.registerUser({ username, email, password });

    res.json({
      message: "Usuario registrado con éxito",
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const data = await AuthService.loginUser({ email, password });

    res.json({
      message: "Login exitoso",
      token: data.token,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
