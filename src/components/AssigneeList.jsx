import React, { useState } from "react";
import styles from "./AssigneeList.module.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function AssigneeList({ onChange, email }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userList = ["payal@gmail.com", "payal@gmail.com", "payal@gmail.com"];

  return (
    <div className={styles.container}>
      <div
        className={styles.display}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {email || "payal@gmail.com"}
        <KeyboardArrowDownOutlinedIcon
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {userList.map((item, index) => {
            return (
              <div className={styles.option} key={index}>
                <div className={styles.logo}>PG</div>
                <p className={styles.email}>{item}</p>
                <button className={styles.assign}>Assign</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
