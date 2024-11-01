import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import Priority from "../components/Priority";
import ChecklistItem from "./ChecklistItem";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { formatDueDate, isPastDue } from "../utils/getDates";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";
import { changeCategory, deleteTask } from "../services/task";

export default function Card({ task, onCollapse, isCollapsed, pageRefresh, toast }) {
  const { checklist, priority, duedate, category, _id } = task;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryList, setCategoryList] = useState([
    "backlog",
    "to-do",
    "in-progress",
    "done",
  ]);
  const [isPastDueDate, setIsPastDueDate] = useState(false);
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const [checkedItems, setCheckedItems] = useState(() => {
    const checked = task?.checklist?.filter((item) => item.completed === true);
    console.log(checked);
    return checked?.length || 0;
  });

  useEffect(() => {
    isCollapsed && setIsExpanded(false);
  }, [isCollapsed]);

  useEffect(() => {
    const list = categoryList.filter((item) => item !== category);
    setCategoryList(list);
    const setDue = isPastDue(duedate);
    setIsPastDueDate(setDue);
  }, []);

  useEffect(() => {
    function handleMenuClose(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        (!modalRef.current || !modalRef.current.contains(e.target))
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMenuClose);
    return () => {
      document.removeEventListener("mousedown", handleMenuClose);
    };
  }, []);

  const formattedDueDate = formatDueDate(duedate);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
    !isExpanded && onCollapse(false);
  };

  const handleCategory = async (nCategory) => {
    console.log(nCategory);
    const res = await changeCategory(_id, nCategory);
    console.log(res);
    pageRefresh(true);
  };

  const handleShare = () => {
    //TODO toast notification
    const base = window.location.origin;
    const link = `${base}/sharedtask/${_id}`;
    navigator.clipboard.writeText(link);
    console.log("Link copied successfully");
    setIsMenuOpen(false);
    toast("Link Copied");
  };

  const handleDelete = async () => {
    const res = await deleteTask(_id);
    console.log(res);
    if(res.status === 200) {
        console.log("toast: task delted");
    } else {
        console.log("toast: Couldn't delete task");
    }
    setIsMenuOpen(false);
    pageRefresh(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.priority}>
          <Priority type={priority} />
        </div>
        <div className={styles.menu} ref={menuRef}>
          <MoreHorizOutlinedIcon onClick={handleMenu} />
          {isMenuOpen && (
            <ul className={styles.options}>
              <EditTaskModal
                modalRef={modalRef}
                task={task}
                triggerEle={<li>Edit</li>}
              />
              <li onClick={handleShare}>Share</li>
              <DeleteTaskModal modalRef={modalRef} onDelete={handleDelete} />
            </ul>
          )}
        </div>
      </div>
      <p className={styles.title}>{task.title}</p>
      <div className={styles.chklistContainer}>
        <div className={styles.chklistHeader}>
          <p>
            Checklist ({checkedItems}/{checklist.length})
          </p>
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
