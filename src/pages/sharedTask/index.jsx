import React from "react";
import styles from "./sharedTask.module.css";
import logo from "../../assets/logo.png";
import Priority from "../../components/Priority";

export default function SharedTask() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} />
          <p>ProManage</p>
        </div>
      </div>
      <div className={styles.card}>
        <div>
          <Priority type="high" />
        </div>
        <div>
          <h2>Title</h2>
        </div>
        <div>
          <p>Checklist (0/2)</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
