import React, { useEffect, useState } from "react";
import styles from "./EditTaskModal.module.css";
import Popup from "reactjs-popup";
import Priority from "./Priority";
import ChecklistItem from "./ChecklistItem";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function EditTaskModal({ modalRef, task }) {
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignee: "",
    checklist: [],
    duedate: null,
  });
  const priorities = ["high", "moderate", "low"];
  const [list, setList] = useState();

  const handlePriority = (value) => {
    setTaskData({ ...taskData, priority: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteList = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleAddList = () => {
    const newList = [...list, ""];
    setList(newList);
  };

  const handleClose = () => {
    setList();
  }

  useEffect(() => {
    task && setTaskData(task);
    setList(task.checklist);
  }, []);

  return (
    <Popup
      trigger={<li>Edit</li>}
      modal
      overlayStyle={{ background: "rgba(48, 61, 67, 0.55)" }}
      onClose={handleClose}
    >
      {(close) => (
        <div className={styles.container} ref={modalRef}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label>
                Title <span className={styles.required}>*</span>
                <input
                  type="text"
                  className={styles.title}
                  value={taskData.title}
                  required
                  onChange={(e) => {
                    setTaskData({ ...taskData, title: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className={styles.priority}>
              Select Priority<span className={styles.required}>*</span>
              {priorities.map((type, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handlePriority(type);
                    }}
                    style={{
                      backgroundColor:
                        type === taskData.priority
                          ? "rgba(238, 236, 236, 1)"
                          : "transparent",
                    }}
                  >
                    <Priority type={type} />
                  </div>
                );
              })}
            </div>
            <div>
              <label className={styles.assignee}>
                Assign to
                <input
                  type="text"
                  value={taskData.assignee}
                  onChange={(e) => {
                    setTaskData({ ...taskData, assignee: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className={styles.list}>
              <p>
                Checklist (1/3) <span className={styles.required}>*</span>
              </p>
              {list?.map((item, index) => {
                return (
                  <ChecklistItem
                    isDelete={true}
                    item={item}
                    key={index}
                    index={index}
                    handleDelete={handleDeleteList}
                  />
                );
              })}
              <div className={styles.addItem} onClick={handleAddList}>
                <AddOutlinedIcon /> Add New
              </div>
              <div className={styles.footer}>
                <button className={styles.duedate}>Select Due Date</button>
                <button
                  className={styles.cancel}
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
                <input type="submit" value="Save" className={styles.save} />
              </div>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}
