import * as styles from "../machineSelector/MachineSelector.module.css";

export default function MachineSelector({ maquinas, onSelect }) {
  return (
    <div className={styles.container}>
      {maquinas.map((maq) => (
        <button
          className={styles.button}
          key={maq.id}
          onClick={() => onSelect(maq.id)}
        >
          {maq.nome}
        </button>
      ))}
    </div>
  );
}
