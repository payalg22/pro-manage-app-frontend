import React from "react";
import styles from "./DeleteTaskModal.module.css";
import Popup from "reactjs-popup";
import BasicModal from "./BasicModal";

export default function DeleteTaskModal({ modalRef, onDelete }) {
  return (
    <Popup
      trigger={<span className={styles.delete}>Delete</span>}
      modal
      overlayStyle={{ background: "rgba(48, 61, 67, 0.55)" }}
    >
      {(close) => (
        <div ref={modalRef} className={styles.parent}>
          <BasicModal close={close} modalFor="Delete" handleAction={onDelete} />
        </div>
      )}
    </Popup>
  );
}
