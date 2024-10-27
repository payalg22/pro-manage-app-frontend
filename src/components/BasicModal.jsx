import React from "react";
import styles from "./BasicModal.module.css";

export default function BasicModal({ close, modalFor, handleAction }) {
  return (
    <div className={styles.container}>
      <p className={styles.confirm}>Are you sure you want to {modalFor}?</p>
      <button
        className={styles.yes}
        onClick={() => {
          handleAction();
          close();
        }}
      >
        Yes, {modalFor}
      </button>
      <button
        className={styles.cancel}
        onClick={() => {
          close();
        }}
      >
        Cancel
      </button>
    </div>
  );
}
