import React, { useState } from "react";
import styles from "./ChecklistItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ChecklistItem({ isDelete, item, index, handleDelete }) {
  const [content, setContent] = useState(item);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.cbContainer}>
        <input type="checkbox" className={styles.inputChkbox} />
        <span className={styles.chkbox}></span>
        <input
          type="text"
          value={content}
          className={styles.title}
          disabled={!isDelete}
          onChange={handleChange}
        />
      </label>
      {isDelete && (
        <DeleteIcon
          className={styles.delete}
          onClick={() => {
            handleDelete(index);
            console.log(index)
          }}
        />
      )}
    </div>
  );
}
