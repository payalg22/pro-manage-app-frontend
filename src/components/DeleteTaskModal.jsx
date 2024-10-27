import React from "react";
import styles from "./DeleteTaskModal.module.css";
import Popup from "reactjs-popup";
import BasicModal from "./BasicModal";

export default function DeleteTaskModal({ modalRef }) {
  const handleDelete = () => {
    //TODO delete task
  };

  return (
    <Popup
      trigger={<span className={styles.delete}>Delete</span>}
      modal
      overlayStyle={{ background: "rgba(48, 61, 67, 0.55)" }}
    >
      {(close) => (
        <div ref={modalRef} className={styles.parent}>
          <BasicModal
            modalFor="Delete"
            close={close}
            handleAction={handleDelete}
          />
        </div>
      )}
    </Popup>
  );
}
