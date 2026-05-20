export const API_BASE_URL = import.meta.env.VITE_SERVER_POSTIFY ?? "http://localhost:8000";

// Dev: permite definir el ID del usuario actual mediante la variable de entorno
// VITE_CURRENT_USER_ID o mediante `localStorage.setItem('currentUserId', '<id>')`.
export function getCurrentUserId() {
  if (typeof window !== "undefined") {
    return (
      import.meta.env.VITE_CURRENT_USER_ID ??
      window.localStorage.getItem("currentUserId") ??
      null
    );
  }

  return import.meta.env.VITE_CURRENT_USER_ID ?? null;
}
