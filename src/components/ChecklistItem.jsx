import React from "react";
import styles from "./ChecklistItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ChecklistItem({ isDelete, item }) {
  return (
    <div className={styles.container}>
      <label className={styles.cbContainer}>
        <input type="checkbox" className={styles.inputChkbox} />
        <span className={styles.chkbox}></span>
        {item}
      </label>
      {isDelete && <DeleteIcon style={{ color: rgba(207, 54, 54, 1) }} />}
    </div>
  );
}
