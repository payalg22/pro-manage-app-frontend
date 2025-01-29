import React, { forwardRef, useEffect, useState } from "react";
import styles from "./ChecklistItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const ChecklistItem = forwardRef(
  (
    { isDelete, item, index, handleDelete, handleChange, handleIsChecked },
    ref
  ) => {
    const [content, setContent] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      setContent(item.content);
      setIsChecked(item.completed);
    }, []);

    const handleTask = (e) => {
      let task = {
        content: e.target.value,
        completed: isChecked,
        _id: index + 10 + "new",
      };
      handleChange(task, index);
    };

    return (
      <div className={styles.container}>
        <label className={styles.cbContainer}>
          <input
            type="checkbox"
            className={styles.inputChkbox}
            checked={isChecked}
            onChange={() => {
              handleIsChecked(!isChecked, index);
              setIsChecked(!isChecked);
            }}
          />
          <span className={styles.chkbox}></span>
          <input
            type="text"
            value={content}
            className={styles.title}
            disabled={!isDelete}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleTask}
            ref={ref}
          />
        </label>
        {isDelete && (
          <DeleteIcon
            className={styles.delete}
            onClick={() => {
              handleDelete(index);
            }}
          />
        )}
      </div>
    );
  }
);

export default ChecklistItem;
