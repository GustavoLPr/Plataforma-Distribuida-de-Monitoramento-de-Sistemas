import { useState } from "react";
import Header from "../../components/header/Header";
import MachineSelector from "../../components/machineSelector/MachineSelector";
import {
  useMaquinas,
  useMetricas,
  useMediaMaquinas,
  useMetricasGlobais,
} from "../../hooks/useMetricas";
import * as styles from "../individualView/IndividualView.module.css";
import MetricCard from "../../components/metricCard/MetricCard";
import CpuMemChart from "../../components/graficos/cpuMemChart/CpuMemChart";
import DiskMountainChart from "../../components/graficos/diskMountainChart/DiskMontainChart";
import MachineRadarChart from "../../components/graficos/radarChart/RadarChart";
import MachineTable from "../../components/machineTable/MachineTable";

export default function IndividualView() {
  const maquinas = useMaquinas();
  const { mediaMaquinas } = useMediaMaquinas();
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const { metricas, loading, error } = useMetricas(maquinaSelecionada);
  const metricasPorMaquina = useMetricasGlobais(maquinas);

  const ultimaMetrica = metricas?.[metricas.length - 1];
  return (
    <div className={styles.container}>
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
          {ultimaMetrica && (
            <MetricCard
              titulo="DISCO"
              valor={ultimaMetrica.discoPercent}
              type="disco"
            />
          )}
        </div>
      </div>
      <div className={styles.CpuMemChart}>
        {" "}
        <div className={styles.chardArea}>
          <span className={styles.titleChard}>CPU e Memória</span>

          <CpuMemChart metricas={metricas} />
        </div>
      </div>
      <div className={styles.discMemArea}>
        <div className={styles.chardArea}>
          <span className={styles.titleChard}>Histórico de disco</span>
          <DiskMountainChart metricas={metricas} />
        </div>
        <div className={styles.chardArea}>
          <span className={styles.titleChard}>
            Comparativo com média do parque
          </span>
          {ultimaMetrica && mediaMaquinas && (
            <MachineRadarChart
              maquinaSelecionada={ultimaMetrica}
              mediaGeral={mediaMaquinas}
            />
          )}
        </div>
      </div>
      <div className={styles.globalArea}>
        <div className={styles.globalAreaTitle}>
          <span className={styles.title}>Visão Global</span>
        </div>
      </div>
      {/* <Header /> */}
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
      <div className={styles.machineTableArea}>
        <MachineTable
          maquinas={maquinas}
          metricasPorMaquina={metricasPorMaquina} // { [maquinaId]: ultimaMetrica }
          onSelect={(id) => setMaquinaSelecionada(id)}
        />
      </div>
    </div>
  );
}
