import React from "react";
import styles from "./dashboard.module.css";
import Panel from "../../components/Panel";

export default function Dashboard() {
  return <div className={styles.container}>
    <div className={styles.left}>
        <Panel option="dashboard" />
    </div>
    <div className={styles.right}></div>
  </div>;
}
