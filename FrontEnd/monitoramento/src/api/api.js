import axios from "axios";

const api = axios.create({
  baseURL: "https://plataforma-distribuida-de-monitoramento-p43o.onrender.com",
  timeout: 5000,
});

export const getMaquinas = () =>
  api.get("/api/maquinas");

export const getMetricas = (maquinaId) =>
  api.get(`/api/metricas/maquina/${maquinaId}`);

export const getMediaMaquinas = () =>
  api.get("/api/metricas/media");

export default api;