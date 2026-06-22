import * as styles from "../machineTable/MachineTable.module.css";

function statusInfo(cpu, memoria, disco) {
  const max = Math.max(cpu, memoria, disco);
  if (max >= 90) return { label: "crítico", className: styles.crit };
  if (max >= 70) return { label: "atenção", className: styles.warn };
  return { label: "normal", className: styles.ok };
}

function barColor(value, warn = 70, crit = 90) {
  if (value >= crit) return "#EF4444";
  if (value >= warn) return "#F59E0B";
  return "#10B981";
}

export default function MachineTable({ maquinas, metricasPorMaquina, onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>TODAS AS MÁQUINAS</div>

      <div className={styles.table}>
        {/* Cabeçalho */}
        <div className={styles.row + " " + styles.header}>
          <div className={styles.colMachine}>MÁQUINA</div>
          <div className={styles.colMetric}>CPU</div>
          <div className={styles.colMetric}>MEMÓRIA</div>
          <div className={styles.colMetric}>DISCO</div>
          <div className={styles.colStatus}>STATUS</div>
        </div>

        {/* Linhas */}
        {maquinas.map((m) => {
          const metrica = metricasPorMaquina[m.id];
          if (!metrica) return null;

          const cpu = Number(metrica.cpuPercent);
          const memoria = Number(metrica.memoriaPercent);
          const disco = Number(metrica.discoPercent);
          const status = statusInfo(cpu, memoria, disco);

          return (
            <div
              key={m.id}
              className={styles.row}
              onClick={() => onSelect?.(m.id)}
            >
              <div className={styles.colMachine}>
                <div className={styles.machineName}>
                  <span className={styles.dot} />
                  {m.nome}
                </div>
                <div className={styles.machineIp}>{m.ip}</div>
              </div>

              <div className={styles.colMetric}>
                <div className={styles.barRow}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${cpu}%`, background: barColor(cpu, 70, 90) }}
                    />
                  </div>
                  <span className={styles.barValue}>{cpu.toFixed(1)}%</span>
                </div>
              </div>

              <div className={styles.colMetric}>
                <div className={styles.barRow}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${memoria}%`, background: barColor(memoria, 80, 95) }}
                    />
                  </div>
                  <span className={styles.barValue}>{memoria.toFixed(1)}%</span>
                </div>
              </div>

              <div className={styles.colMetric}>
                <div className={styles.barRow}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${disco}%`, background: barColor(disco, 75, 90) }}
                    />
                  </div>
                  <span className={styles.barValue}>{disco.toFixed(1)}%</span>
                </div>
              </div>

              <div className={styles.colStatus}>
                <span className={status.className}>{status.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}