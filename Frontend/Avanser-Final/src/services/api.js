const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function apiFetch(path, options = {}) {
  const access = localStorage.getItem("access");

  const url = `${API.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    throw new Error("No autorizado (401). Token inválido o expirado.");
  }

  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}
