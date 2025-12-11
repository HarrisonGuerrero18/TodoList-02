import { API_URL } from "./config";

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error((await res.json()).error);

  const response = await res.json();

  // guardamos el token
  localStorage.setItem("token", response.token);

  return response;
}

export function logout() {
  localStorage.removeItem("token");
}
