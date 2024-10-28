import React, { useEffect, useState } from "react";
import styles from "./EditTaskModal.module.css";
import Popup from "reactjs-popup";
import Priority from "./Priority";
import ChecklistItem from "./ChecklistItem";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DueDatePicker from "./DueDatePicker";
import AssigneeList from "./AssigneeList";

export default function EditTaskModal({ triggerEle, modalRef, task }) {
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignee: "",
    checklist: [],
    duedate: null,
  });
  const priorities = ["high", "moderate", "low"];
  const [list, setList] = useState();

  useEffect(() => {
    task && setTaskData(task);
    setList(task?.checklist);
  }, []);

  const handlePriority = (value) => {
    setTaskData({ ...taskData, priority: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO validation and submission
    //Check if task id is present or not
  };

  const handleDeleteList = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleAddList = () => {
    const newList = list ? [...list, ""] : [""];
    setList(newList);
  };

  const handleDueDate = (date) => {
    setTaskData({ ...taskData, duedate: date });
  };

  const handleClose = () => {
    setList();
    setTaskData({
      title: "",
      priority: "",
      assignee: "",
      checklist: [],
      duedate: null,
    });
  };

  const handleAssignee = (value) => {
    setTaskData({ ...taskData, assignee: value });
  };

  return (
    <Popup
      trigger={triggerEle}
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
            <div className={styles.assignee}>
              Assign to
              <AssigneeList
                onChange={handleAssignee}
                email={FormData?.assignee}
              />
            </div>
            <div className={styles.list}>
              <p>
                Checklist (1/3) <span className={styles.required}>*</span>
              </p>
              {list && (
                <div className={styles.listItems}>
                  {list.map((item, index) => {
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
                </div>
              )}
              <div className={styles.addItem} onClick={handleAddList}>
                <AddOutlinedIcon /> Add New
              </div>
            </div>
            <div className={styles.footer}>
              <DueDatePicker due={taskData?.duedate} onChange={handleDueDate} />
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
          </form>
        </div>
      )}
    </Popup>
  );
}
