import React, { useState } from "react";
import styles from "./AddMemberModal.module.css";
import Popup from "reactjs-popup";
import shareIcon from "../assets/share.png";
import AssigneeList from "./AssigneeList";
import { addMember } from "../services/task";

export default function AddMemberModal({ pageRefresh, toast }) {
  const [isNotification, setIsNotification] = useState(false);
  const [userEmail, setUserEmail] = useState();

  const handleAddMember = async () => {
    const res = await addMember(userEmail);
    if (res.status === 200) {
      setIsNotification(true);
      pageRefresh(true);
    } else {
      toast("Something went wrong");
    }
  };

  const handleChange = (id, email) => {
    setUserEmail({ email, _id: id });
  };

  const handleModalClose = () => {
    setUserEmail("");
    setIsNotification(false);
  };

  return (
    <Popup
      trigger={
        <span className={styles.share}>
          <img src={shareIcon} />
          <p>Add People</p>
        </span>
      }
      modal
      overlayStyle={{ backgroundColor: "rgba(48, 61, 67, 0.55)" }}
      onClose={handleModalClose}
    >
      {(close) => (
        <div className={styles.container}>
          {isNotification ? (
            <div className={styles.notification}>
              <p className={styles.heading}>{userEmail.email} added to board</p>
              <button
                className={styles.add}
                onClick={() => {
                  close();
                }}
              >
                Okay, got it!
              </button>
            </div>
          ) : (
            <div className={styles.getEmail}>
              <p className={styles.heading}>Add people to the board</p>
              <div className={styles.userlist}>
                <AssigneeList onChange={handleChange} />
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.cancel}
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
                <button className={styles.add} onClick={handleAddMember}>
                  Add Email
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
}
