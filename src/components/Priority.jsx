import React from "react";
import styles from "./Priority.module.css";
import priorityTypes from "../data/priorityTypes";

export default function Priority({ type }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.marker}
        style={{ background: priorityTypes[type].color }}
      ></div>
      <p className={styles.type}>{priorityTypes[type].name}</p>
    </div>
  );
}
