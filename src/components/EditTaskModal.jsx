import React, { useEffect, useState } from "react";
import styles from "./EditTaskModal.module.css";
import Popup from "reactjs-popup";
import Priority from "./Priority";
import ChecklistItem from "./ChecklistItem";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DueDatePicker from "./DueDatePicker";
import AssigneeList from "./AssigneeList";
import { validateTask } from "../utils/validateForm";

export default function EditTaskModal({
  triggerEle,
  modalRef,
  task,
  saveTask,
}) {
  const [taskData, setTaskData] = useState({
    title: task?.title || "",
    priority: task?.priority || "",
    assignee: task?.assignee || null,
    checklist: task?.checklist || [],
    duedate: task?.duedate || null,
  });
  const priorities = ["high", "moderate", "low"];
  const [list, setList] = useState(task?.checklist);
  const [isError, setIsError] = useState({
    title: false,
    priority: false,
    checklist: false,
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    const checked = task?.checklist?.filter((item) => item.completed === true);
    console.log(checked);
    return checked?.length || 0;
  });

  useEffect(() => {
    const checkList = list?.filter((item) => item.content !== "");
    setTaskData({ ...taskData, checklist: checkList });
  }, [list]);

  const handlePriority = (value) => {
    setTaskData({ ...taskData, priority: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskData);
    const { isValid, invalidFields } = validateTask(taskData);
    if (!isValid) {
      console.log(invalidFields);
      setIsError(invalidFields);
      return;
    }
    saveTask(taskData);
    handleClose();
  };

  const handleDeleteList = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    console.log(index, newList);
    setList(newList);
  };

  const handleAddList = () => {
    if (!list || list.slice(-1)[0].content !== "") {
      const item = { content: "", completed: false, _id:list?.length + 10 + "newtask" };
      const newList = list ? [...list, item] : [item];
      setList(newList);
    }
  };

  const handleList = (value, index) => {
    const modifiedList = list;
    modifiedList[index] = value;
    setList(modifiedList);
  };

  const handleDueDate = (date) => {
    const due = new Date(date);
    setTaskData({ ...taskData, duedate: due });
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
    setIsError({
      title: false,
      priority: false,
      checklist: false,
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
              close();
            }}
          >
            <div>
              <label>
                Title <span className={styles.required}>*</span>
                {isError?.title && (
                  <span className={styles.error}>Please enter title</span>
                )}
                <input
                  type="text"
                  className={styles.title}
                  value={taskData.title}
                  onChange={(e) => {
                    setTaskData({ ...taskData, title: e.target.value });
                    setIsError({ ...isError, title: false });
                  }}
                />
              </label>
            </div>
            <div>
              <div className={styles.priority}>
                Select Priority<span className={styles.required}>*</span>
                {priorities.map((type, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handlePriority(type);
                        setIsError({ ...isError, priority: false });
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
              {isError?.priority && (
                <span className={styles.error}>Please select priority</span>
              )}
            </div>
            <div className={styles.assignee}>
              Assign to
              <AssigneeList
                onChange={handleAssignee}
                email={taskData?.assignee}
              />
            </div>
            <div className={styles.list}>
              <p>
                Checklist ({checkedItems}/{list?.length || "0"}){" "}
                <span className={styles.required}>*</span>
                {isError?.checklist && (
                  <span className={styles.error}>
                    Checklist cannot be empty
                  </span>
                )}
              </p>
              {list && (
                <div className={styles.listItems}>
                  {list.map((item, index) => {
                    return (
                      <ChecklistItem
                        isDelete={true}
                        item={item}
                        key={item._id}
                        index={index}
                        handleDelete={handleDeleteList}
                        handleChange={handleList}
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
