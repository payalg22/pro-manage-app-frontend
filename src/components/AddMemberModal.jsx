import React, { useState } from "react";
import styles from "./AddMemberModal.module.css";
import Popup from "reactjs-popup";
import shareIcon from "../assets/share.png";

export default function AddMemberModal() {
  const [isNotification, setIsNotification] = useState(false);
  const [userEmail, setUserEmail] = useState();

  const handleAddMember = () => {
    setIsNotification(true);
  };

  const handleModalClose = () => {
    setUserEmail("");
    setIsNotification(false);
  }

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
              <p className={styles.heading}>{userEmail} added to board</p>
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
              <input
                type="text"
                placeholder="Enter the mail"
                className={styles.email}
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              <div className={styles.buttons}>
                <button className={styles.cancel}>Cancel</button>
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
