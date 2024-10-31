import styles from "./Category.module.css";
import React, { useState } from "react";
import collapseIcon from "../assets/collapseIcon.png";
import Card from "./Card";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditTaskModal from "./EditTaskModal";

export default function Category({ category, tasks }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isTodo = () => category.trim() === "To Do";

  const handleCollapse = (value) => {
    setIsCollapsed(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {category}
        <span className={styles.utility}>
          {isTodo() && <EditTaskModal triggerEle={<AddOutlinedIcon />} />}
          <img src={collapseIcon} onClick={() => handleCollapse(true)} />
        </span>
      </div>
      <div className={styles.content}>
        {tasks.map((task, index) => {
          return (
            <Card
              task={task}
              key={index}
              onCollapse={handleCollapse}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </div>
    </div>
  );
}
