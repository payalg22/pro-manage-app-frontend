import styles from "./AnalyticsList.module.css";
import React from "react";

export default function AnalyticsList({ list }) {
  return (
    <div className={styles.container}>
      {list.map((item, index) => {
        return (
          <div key={index} className={styles.listEntry}>
            <span className={styles.type}>
              <div className={styles.marker}></div>
              <p>{item.id}</p>
            </span>
            <span className={styles.value}>{item.count}</span>
          </div>
        );
      })}
    </div>
  );
}
