import { useState } from "react";
import Header from "../../components/header/Header";
import MachineSelector from "../../components/machineSelector/MachineSelector";
import { useMaquinas, useMetricas } from "../../hooks/useMetricas";
import * as styles from "../individualView/IndividualView.module.css";
import MetricCard from "../../components/metricCard/MetricCard";
import CpuMemChart from "../../components/graficos/cpuMemChart/CpuMemChart";
import DiskMountainChart from "../../components/graficos/diskMountainChart/DiskMontainChart";

export default function IndividualView() {
  const maquinas = useMaquinas();

  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);

  const { metricas, loading, error } = useMetricas(maquinaSelecionada);

  const ultimaMetrica = metricas[metricas.length - 1];

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.buttons}>
        <MachineSelector maquinas={maquinas} onSelect={setMaquinaSelecionada} />
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCardsSpace}>
          {ultimaMetrica && (
            <MetricCard
              titulo="MEMÓRIA"
              valor={ultimaMetrica.memoriaPercent}
              type="memoria"
            />
          )}
        </div>
        <div className={styles.metricCardsSpace}>
          {ultimaMetrica && (
            <MetricCard
              titulo="CPU"
              valor={ultimaMetrica.cpuPercent}
              type="cpu"
            />
          )}
        </div>
        <div className={styles.metricCardsSpace}>
          {" "}
          {ultimaMetrica && (
            <MetricCard
              titulo="DISCO"
              valor={ultimaMetrica.discoPercent}
              type="disco"
            />
          )}
        </div>
      </div>
      <div className={styles.chardArea}>
        <span className={styles.titleChard}>CPU e Memória</span>

        <CpuMemChart metricas={metricas} />
      </div>
      <div className={styles.chardArea}>
        <span className={styles.titleChard}>Histórico de disco</span>
        <DiskMountainChart metricas={metricas} />
      </div>

      {/* 
      <span>Máquina selecionada: {maquinaSelecionada}</span>

      {ultimaMetrica && (
        <>
          <h3>CPU: {ultimaMetrica.cpuPercent}%</h3>
          <h3>RAM: {ultimaMetrica.memoriaPercent}%</h3>
          <h3>Disco: {ultimaMetrica.discoPercent}%</h3>
        </>
      )} */}

      {/* <pre>{JSON.stringify(metricas, null, 2)}</pre> */}
    </div>
  );
}
