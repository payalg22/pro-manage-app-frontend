import React from "react";
import styles from "./dashboard.module.css";
import Panel from "../../components/Panel";
import shareIcon from "../../assets/share.png";
import Category from "../../components/Category";

export default function Dashboard() {
  const category = [
    {
      name: "Backlog",
      tasks: [
        {
          priority: "low",
          checklist: ["item1", "item2"],
          duedate: "2024/10/26",
          category: "backlog",
        },
        {
          priority: "high",
          checklist: ["item1", "item2"],
          duedate: "2024/10/22",
          category: "backlog",
        },
      ],
    },
    {
      name: "In progress",
      tasks: [],
    },
    {
      name: "To do",
      tasks: [
        {
          priority: "low",
          checklist: ["item1", "item2"],
          duedate: "2024/10/29",
          category: "to-do",
        },
      ],
    },
    {
      name: "Done",
      tasks: [],
    },
  ];

  const getToday = (date = new Date()) => {
    const shortDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const [month, day, year] = shortDate.replace(",", "").split(" ");

    return `${day}th ${month}, ${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Panel option="dashboard" />
      </div>
      <div className={styles.right}>
        <div className={styles.welcome}>Welcome! Payal</div>
        <div>
          <p className={styles.date}>{getToday()}</p>
        </div>
        <div className={styles.header}>
          <p>Board</p>
          <span className={styles.share}>
            <img src={shareIcon} />
            <p>Add People</p>
          </span>
        </div>
        <div className={styles.body}>
          {category.map((item, index) => {
            return (
              <div key={index}>
                <Category category={item.name} tasks={item.tasks} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
