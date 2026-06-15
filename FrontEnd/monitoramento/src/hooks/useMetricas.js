import { useState, useEffect } from "react";
import { getMaquinas, getMetricas } from "../api/api";

export function useMetricas(maquinaId) {
  const [metricas, setMetricas] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!maquinaId) return;

    const fetch = async () => {
      try {
        const { data } = await getMetricas(maquinaId);
        setMetricas(data);
        setError(null);
      } catch (e) {
        setError("Erro ao buscar métricas.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [maquinaId]);

  return { metricas, loading, error };
}

export function useMaquinas() {
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    getMaquinas().then(({ data }) => setMaquinas(data));
  }, []);

  return maquinas;
}