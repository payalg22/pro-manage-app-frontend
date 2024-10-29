import React, { useRef, useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import Panel from "../../components/Panel";
import Category from "../../components/Category";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { getToday } from "../../utils/getDates";
import AddMemberModal from "../../components/AddMemberModal";
import { taskFilter } from "../../services/task";

export default function Dashboard() {
  const [filter, setFilter] = useState("This Week");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [category, setCategory] = useState([
    { name: "Backlog", tasks: [] },
    { name: "To Do", tasks: [] },
    { name: "In Progress", tasks: [] },
    { name: "Done", tasks: [] },
  ]);

  const menuRef = useRef(null);
  const filters = [" Today", "This Week", "This Month"];

  useEffect(() => {
    function handleMenuClose(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMenuClose);
    return () => {
      document.removeEventListener("mousedown", handleMenuClose);
    };
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      const selectedFilter = filter?.split(" ")[1]?.toLowerCase();
      const res = await taskFilter(selectedFilter);
      console.log(res.data);

      return res.data;
    };

    getTasks().then((tasks) => {
      const { backlogTasks, doneTasks, inProgressTasks, toDoTasks } = tasks;
      console.log(toDoTasks);
      setCategory([
        { name: "Backlog", tasks: backlogTasks },
        { name: "To Do", tasks: toDoTasks },
        { name: "In Progress", tasks: inProgressTasks },
        { name: "Done", tasks: doneTasks },
      ]);
    });
    // const { backlogTasks, doneTasks, inProgressTasks, toDoTasks } = getTasks();
  }, [filter]);

  //   const category = [
  //     {
  //       name: "Backlog",
  //       tasks: [
  //         {
  //           title: "Task no 1",
  //           priority: "low",
  //           checklist: ["item1", "item2"],
  //           duedate: "2024/10/26",
  //           category: "backlog",
  //         },
  //         {
  //           priority: "high",
  //           checklist: ["item1", "item2"],
  //           duedate: "2024/10/22",
  //           category: "backlog",
  //         },
  //       ],
  //     },
  //     {
  //       name: "In progress",
  //       tasks: [],
  //     },
  //     {
  //       name: "To do",
  //       tasks: [
  //         {
  //           priority: "low",
  //           checklist: ["item1", "item2"],
  //           duedate: "2024/10/29",
  //           category: "to-do",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Done",
  //       tasks: [],
  //     },
  //   ];

  //   const category = [
  //     { name: "Backlog", tasks: [] },
  //     { name: "To Do", tasks: [] },
  //     { name: "In Progress", tasks: [] },
  //     { name: "Done", tasks: [] },
  //   ];

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelection = (value) => {
    setFilter(value);
    handleMenu();
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Panel option="dashboard" />
      </div>
      <div className={styles.right}>
        <div className={styles.welcome}>Welcome! Payal</div>
        <div>
          <p className={styles.date}>{getToday()}</p>
        </div>
        <div className={styles.header}>
          <p>Board</p>
          <AddMemberModal />
          <div className={styles.menu} ref={menuRef}>
            <span onClick={handleMenu} className={styles.filter}>
              {filter}
              <KeyboardArrowDownOutlinedIcon />
            </span>
            {isMenuOpen && (
              <ul className={styles.options}>
                {filters.map((selection, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        handleSelection(selection);
                      }}
                    >
                      {selection}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.body}>
          {category.map((item, index) => {
            return (
              <div key={index}>
                <Category category={item.name} tasks={item.tasks} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
