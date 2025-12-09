import { prisma } from "../db/queries.js";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser({ username, email, password }) {
  // Verificar si ya existe el usuario
  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  if (exists) {
    throw new Error("El usuario o correo ya está registrado");
  }

  // Encriptar contraseña
  const hashed = await bcrypt.hash(password, 10);

  // Crear usuario
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashed
    }
  });

  return user;
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) throw new Error("Credenciales incorrectas");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Credenciales incorrectas");

  // Crear token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}
