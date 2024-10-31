import React, { useEffect, useState } from "react";
import styles from "./ChecklistItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ChecklistItem({
  isDelete,
  item,
  index,
  handleDelete,
  handleChange,
}) {
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setContent(item.content);
    setIsChecked(item.completed);
  }, []);

  const handleTask = (e) => {
    setContent(e.target.value);
    let task = {
        content: e.target.value,
        completed: isChecked,
    }
    handleChange(task, index);
  }

  return (
    <div className={styles.container}>
      <label className={styles.cbContainer}>
        <input
          type="checkbox"
          className={styles.inputChkbox}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className={styles.chkbox}></span>
        <input
          type="text"
          value={content}
          className={styles.title}
          disabled={!isDelete}
          onChange={handleTask}
        />
      </label>
      {isDelete && (
        <DeleteIcon
          className={styles.delete}
          onClick={() => {
            handleDelete(index);
            console.log(index, item, content);
          }}
        />
      )}
    </div>
  );
}
