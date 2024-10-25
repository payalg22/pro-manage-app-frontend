import React, { useState } from "react";
import styles from "./analytics.module.css";
import Panel from "../../components/Panel";
import AnalyticsList from "../../components/AnalyticsList";

export default function Analytics() {
  const [category, setCategory] = useState([
    {
      id: "Backlog Tasks",
      count: 6,
    },
    {
      id: "To-do Tasks",
      count: 2,
    },
    {
      id: "In-Progress Tasks",
      count: 2,
    },
    {
      id: "Completed Tasks",
      count: 2,
    },
  ]);

  const [priority, setPriority] = useState([
    {
      id: "Low Priority",
      count: 0,
    },
    {
      id: "Moderate Priority",
      count: 0,
    },
    {
      id: "High Priority",
      count: 0,
    },
    {
      id: "Due Date Tasks",
      count: 0,
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Panel option="analytics" />
      </div>
      <div className={styles.right}>
        <h2>Analytics</h2>
        <div className={styles.list}>
          <AnalyticsList list={category} />
          <AnalyticsList list={priority} />
        </div>
      </div>
    </div>
  );
}
