// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true, // Essencial para o Sanctum SPA com autenticação baseada em cookies
  headers: {
    "X-Requested-With": "XMLHttpRequest", // Frequentemente necessário para o Laravel identificar requisições AJAX
    Accept: "application/json", // Para que o Laravel retorne JSON em caso de erro de autenticação
  },
});

export default api;
