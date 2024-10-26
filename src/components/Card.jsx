import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import Priority from "../components/Priority";
import ChecklistItem from "./ChecklistItem";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export default function Card({ task, onCollapse, isCollapsed }) {
  const { checklist, priority, duedate, category } = task;
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryList, setCategoryList] = useState([
    "backlog",
    "to-do",
    "in-progress",
    "done",
  ]);
  const [isPastDueDate, setIsPastDueDate] = useState(false);

  useEffect(() => {
    isCollapsed && setIsExpanded(false);
  }, [isCollapsed]);

  useEffect(() => {
    const list = categoryList.filter((item) => item !== category);
    setCategoryList(list);
    const setDue = isPastDue(duedate);
    setIsPastDueDate(setDue);
  }, []);

  const formattedDueDate = new Date(duedate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const isPastDue = (due) => {
    const duedate = new Date(due);
    const diff = new Date().setHours(0, 0, 0, 0) - duedate.setHours(0, 0, 0, 0);
    if (diff <= 0) {
      return false;
    }
    return true;
  };

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
    !isExpanded && onCollapse(false);
  };

  const handleCategory = (nCategory) => {
    //TODO change category
    console.log(nCategory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Priority type={priority} />
      </div>
      <p className={styles.title}>Task title goes here</p>
      <div className={styles.chklistContainer}>
        <div className={styles.chklistHeader}>
          <p>Checklist (0/{checklist.length})</p>
          <span className={styles.expand} onClick={handleExpansion}>
            {isExpanded ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </span>
        </div>
        <div
          className={styles.list}
          style={{ display: isExpanded ? "flex" : "none" }}
        >
          {checklist.map((item, index) => {
            return <ChecklistItem key={index} isDelete={false} item={item} />;
          })}
        </div>
      </div>
      <div className={styles.footer}>
        {duedate ? (
          <span className={isPastDueDate ? styles.duedate : styles.normal}>
            {formattedDueDate}
          </span>
        ) : (
          <span></span>
        )}
        <span className={styles.categoryList}>
          {categoryList.map((item, index) => {
            return (
              <span
                key={index}
                className={styles.category}
                onClick={() => {
                  handleCategory(item);
                }}
              >
                {item.replace("in-", "").toUpperCase()}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
