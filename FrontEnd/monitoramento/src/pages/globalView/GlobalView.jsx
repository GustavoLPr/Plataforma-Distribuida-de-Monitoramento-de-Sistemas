import { useMaquinas, useMetricas } from "../../hooks/useMetricas";
import { useMemo } from "react";
import Header from "../../components/header/Header";
import * as styles from "../individualView/IndividualView.module.css";
import MetricCard from "../../components/metricCard/MetricCard";
import CpuMemChart from "../../components/graficos/cpuMemChart/CpuMemChart";
import DiskMountainChart from "../../components/graficos/diskMountainChart/DiskMontainChart";

export default function GlobalView() {
  const maquinas = useMaquinas();

  // Pega métricas de todas as máquinas
  const { metricas, loading, error } = useMetricas(null);

  // Cálculo da média global
  const mediaMetricas = useMemo(() => {
    if (!metricas || metricas.length === 0) return null;

    let somaCpu = 0;
    let somaMem = 0;
    let somaDisco = 0;

    metricas.forEach((m) => {
      somaCpu += m.cpuPercent;
      somaMem += m.memoriaPercent;
      somaDisco += m.discoPercent;
    });

    const qtd = metricas.length;

    return {
      cpuPercent: somaCpu / qtd,
      memoriaPercent: somaMem / qtd,
      discoPercent: somaDisco / qtd,
    };
  }, [metricas]);

  return (
    <div className={styles.container}>
      <Header />

      <h2 className={styles.titleChard}>Visão Global das Máquinas</h2>
<div className={styles.metricCards}>
  <div className={styles.metricCardsSpace}>
    {mediaMetricas && (
      <MetricCard
        titulo="MEMÓRIA (Média Global)"
        valor={mediaMetricas.memoriaPercent}
        type="memoria"
      />
    )}
  </div>
  <div className={styles.metricCardsSpace}>
    {mediaMetricas && (
      <MetricCard
        titulo="CPU (Média Global)"
        valor={mediaMetricas.cpuPercent}
        type="cpu"
      />
    )}
  </div>
  <div className={styles.metricCardsSpace}>
    {mediaMetricas && (
      <MetricCard
        titulo="DISCO (Média Global)"
        valor={mediaMetricas.discoPercent}
        type="disco"
      />
    )}
  </div>
</div>

      <div className={styles.chardArea}>
        <span className={styles.titleChard}>CPU e Memória (Global)</span>
        <CpuMemChart metricas={metricas} />
      </div>

      <div className={styles.chardArea}>
        <span className={styles.titleChard}>Histórico de Disco (Global)</span>
        <DiskMountainChart metricas={metricas} />
      </div>
    </div>
  );
}
