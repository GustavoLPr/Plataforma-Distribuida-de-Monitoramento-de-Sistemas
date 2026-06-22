import * as styles from "../metricCard/MetricCard.module.css";

export default function MetricCard({ titulo, valor, type }) {
  const COLORS = {
    cpu: "#3B82F6",
    memoria: "#10B981",
    disco: "#F59E0B",
  };

  const color = COLORS[type];

  return (
    <div
      className={styles.container}
      style={{
        "--accent-color": color,
      }}
    >
      <div className={styles.titleArea}>
        <h3 className={styles.title}>{titulo}</h3>
      </div>

      <div className={styles.valorArea}>
        <span className={styles.valor}>{Number(valor).toFixed(2)}%</span>{" "}
      </div>

      {/* BARRA */}
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            width: `${valor}%`,
          }}
        />
      </div>
    </div>
  );
}
