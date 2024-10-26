import styles from "./Category.module.css";
import React, { useState } from "react";
import collapseIcon from "../assets/collapseIcon.png";
import Card from "./Card";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Category({ category, tasks }) {
  const [ isCollapsed, setIsCollapsed ] = useState(true);

  const handleCollapse = (value) => {
    setIsCollapsed(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {category}
        <span className={styles.utility}>
          {category === "To do" && <AddOutlinedIcon />}
          <img src={collapseIcon} onClick={() => handleCollapse(true)} />
        </span>
      </div>
      <div className={styles.content}>
        {tasks.map((task, index) => {
          return <Card task={task} key={index} onCollapse={handleCollapse} isCollapsed={isCollapsed} />;
        })}
      </div>
    </div>
  );
}