import { useState, useEffect } from "react";
import { getMaquinas, getMetricas, getMediaMaquinas } from "../api/api";

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

export function useMediaMaquinas() {
  const [mediaMaquinas, setMediaMaquinas] = useState(null);       // última média
  const [mediaHistorica, setMediaHistorica] = useState([]);       // histórico acumulado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMediaMaquinas();

        setMediaMaquinas(data);
        setMediaHistorica(prev => [...prev, data]);  // acumula no histórico
        setError(null);
      } catch (e) {
        setError("Erro ao buscar média das máquinas.");
      } finally {
        setLoading(false);
      }
    };

    fetch();

    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  return { mediaMaquinas, mediaHistorica, loading, error };
}

export function useMetricasGlobais(maquinas) {
  const [metricasPorMaquina, setMetricasPorMaquina] = useState({});

  useEffect(() => {
    if (!maquinas.length) return;

    const fetchAll = async () => {
      const resultados = await Promise.all(
        maquinas.map((m) => getMetricas(m.id))
      );
      const mapa = {};
      resultados.forEach(({ data }, i) => {
        mapa[maquinas[i].id] = data[data.length - 1];
      });
      setMetricasPorMaquina(mapa);
    };

    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [maquinas]);

  return metricasPorMaquina;
}