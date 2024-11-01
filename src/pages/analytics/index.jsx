import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import Panel from "../../components/Panel";
import AnalyticsList from "../../components/AnalyticsList";
import { getAnalytics } from "../../services/task";

export default function Analytics() {
  const [category, setCategory] = useState([
    {
      id: "Backlog Tasks",
      count: 0,
    },
    {
      id: "To-do Tasks",
      count: 0,
    },
    {
      id: "In-Progress Tasks",
      count: 0,
    },
    {
      id: "Completed Tasks",
      count: 0,
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

  useEffect(() => {
    getAnalytics().then((res) => {
      if (res.status === 200) {
        const count = res.data;
        setCategory([
          {
            id: "Backlog Tasks",
            count: count?.backlog || 0,
          },
          {
            id: "To-do Tasks",
            count: count?.todo || 0,
          },
          {
            id: "In-Progress Tasks",
            count: count?.inprogress || 0,
          },
          {
            id: "Completed Tasks",
            count: count?.done || 0,
          },
        ]);
        setPriority([
          {
            id: "Low Priority",
            count: count.low || 0,
          },
          {
            id: "Moderate Priority",
            count: count.moderate || 0,
          },
          {
            id: "High Priority",
            count: count.high || 0,
          },
          {
            id: "Due Date Tasks",
            count: count.duedate || 0,
          },
        ]);
      }
    });
  }, []);

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
