import React, { useEffect, useState } from "react";
import styles from "./AssigneeList.module.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { getUserList } from "../services/user";
import createLogo from "../utils/createLogo";

export default function AssigneeList({ onChange, email }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userList, setUserList] = useState();
  const [assignee, setAssignee] = useState(email);

  useEffect(() => {
    getUserList().then((res) => {
      console.log(res.data);
      setUserList(res.data.allUsers);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        {assignee || "Select Assignee"}
        <KeyboardArrowDownOutlinedIcon
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {userList.map((item, index) => {
            return (
              <div className={styles.option} key={index}>
                <div className={styles.logo}>{createLogo(item.name)}</div>
                <p className={styles.email}>{item.email}</p>
                <button
                  className={styles.assign}
                  onClick={() => {
                    setAssignee(item.email);
                    onChange(item._id);
                    setIsDropdownOpen(false);
                  }}
                >
                  Assign
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
