import React, { useEffect, useState } from "react";
import styles from "./sharedTask.module.css";
import logo from "../../assets/logo.png";
import Priority from "../../components/Priority";
import { useParams } from "react-router-dom";
import { getSharedTask } from "../../services/task";
import PendingIcon from "@mui/icons-material/Pending";
import ChecklistItem from "../../components/ChecklistItem";
import { formatDueDate } from "../../utils/getDates";

export default function SharedTask() {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(0);

  useEffect(() => {
    getSharedTask(id).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        const task = res.data.getTask;
        if (task.duedate) {
          task.duedate = formatDueDate(task.duedate);
        }
        const checkedItems = task?.checklist.filter(
          (item) => item.completed === true
        );
        setIsChecked(checkedItems?.length || 0);
        setTask(task);
      }
    });
  }, []);

  //To locally handle checked list items
  const handleCheckedItems = (value, index) => {
    setIsChecked((prev) => {
      return value ? prev + 1 : prev - 1;
    });
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <PendingIcon />
          <p>Loading </p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} />
              <p>ProManage</p>
            </div>
          </div>
          <div className={styles.card}>
            <div>
              <Priority type={task.priority} />
            </div>
            <div>
              <h2>{task.title}</h2>
            </div>
            <div>
              <p>
                Checklist ({isChecked}/{task?.checklist.length})
              </p>
              <div className={styles.checklist}>
                {task?.checklist?.map((item, index) => {
                  return (
                    <ChecklistItem
                      key={index}
                      item={item}
                      isDelete={false}
                      handleIsChecked={handleCheckedItems}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              {task.duedate && (
                <p className={styles.duedate}>
                  Due Date <span>{task.duedate}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
