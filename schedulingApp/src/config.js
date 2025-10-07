export const BACKEND_URL = "https://scheduling-app-backend-b4fcac504465.herokuapp.com" || "http://localhost:8000";
export const WS_PROTOCOL = BACKEND_URL.startsWith("https") ? "wss" : "ws";