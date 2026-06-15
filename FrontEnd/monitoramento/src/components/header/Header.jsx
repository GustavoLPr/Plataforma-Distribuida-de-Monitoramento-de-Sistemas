import * as styles from "../header/header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.swichPage}>Máquina individual</Link>
      <Link to={"/global"} className={styles.swichPage}>Visão Global</Link>
    </div>
  );
}
