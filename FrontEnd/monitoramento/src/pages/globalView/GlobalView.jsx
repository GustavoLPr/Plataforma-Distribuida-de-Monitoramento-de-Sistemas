import Header from "../../components/header/Header";
import { useMediaMaquinas } from "../../hooks/useMetricas";
import * as styles from "../individualView/IndividualView.module.css";
import MetricCard from "../../components/metricCard/MetricCard";
import CpuMemChart from "../../components/graficos/cpuMemChart/CpuMemChart";

export default function GlobalView() {
  const { mediaMaquinas, mediaHistorica, loading, error } = useMediaMaquinas();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.metricCards}>
        <div className={styles.metricCardsSpace}>
          {mediaMaquinas && (
            <MetricCard
              titulo="MEMÓRIA (Média Global)"
              valor={mediaMaquinas.memoriaPercent}
              type="memoria"
            />
          )}
        </div>

        <div className={styles.metricCardsSpace}>
          {mediaMaquinas && (
            <MetricCard
              titulo="CPU (Média Global)"
              valor={mediaMaquinas.cpuPercent}
              type="cpu"
            />
          )}
        </div>

        <div className={styles.metricCardsSpace}>
          {mediaMaquinas && (
            <MetricCard
              titulo="DISCO (Média Global)"
              valor={mediaMaquinas.discoPercent}
              type="disco"
            />
          )}
        </div>
      </div>

      <div className={styles.CpuMemChart}>
        <div className={styles.chardArea}>
          <span className={styles.titleChard}>
            CPU e Memória (Médias Históricas)
          </span>
          <CpuMemChart metricas={mediaHistorica} />
        </div>
      </div>
    </div>
  );
}
