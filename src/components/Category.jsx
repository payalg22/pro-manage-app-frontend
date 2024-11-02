import styles from "./Category.module.css";
import React, { useState } from "react";
import collapseIcon from "../assets/collapseIcon.png";
import Card from "./Card";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditTaskModal from "./EditTaskModal";
import { postNewTask } from "../services/task";

export default function Category({ category, tasks, pageRefresh, toast }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isTodo = () => category.trim() === "To Do";

  const handleCollapse = (value) => {
    setIsCollapsed(value);
  };

  const handleNewTask = async (taskData) => {
    const res = await postNewTask(taskData);
    if (res.status !== 201) {
      toast("Something went wrong");
      return;
    }
    toast("Task Created");
    pageRefresh(true);
    return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {category}
        <span className={styles.utility}>
          {isTodo() && (
            <EditTaskModal
              triggerEle={<AddOutlinedIcon />}
              saveTask={handleNewTask}
            />
          )}
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
              pageRefresh={pageRefresh}
              toast={toast}
            />
          );
        })}
      </div>
    </div>
  );
}
