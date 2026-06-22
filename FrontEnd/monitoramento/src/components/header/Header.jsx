import * as styles from "../header/header.module.css";
import { Link } from "react-router-dom";
import MetricCard from "../metricCard/MetricCard";
import { useMediaMaquinas } from "../../hooks/useMetricas";

export default function Header() {
  const { mediaMaquinas, mediaHistorica, loading, error } = useMediaMaquinas();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
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
    // <div className={styles.container}>
    //   <Link to={"/"} className={styles.swichPage}>Máquina individual</Link>
    //   <Link to={"/global"} className={styles.swichPage}>Visão Global</Link>
    // </div>
  );
}
