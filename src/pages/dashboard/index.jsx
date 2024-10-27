import React, { useRef, useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import Panel from "../../components/Panel";
import Category from "../../components/Category";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { getToday } from "../../utils/getDates";
import AddMemberModal from "../../components/AddMemberModal";

export default function Dashboard() {
  const [filter, setFilter] = useState("Today");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const filters = ["Today", "This Week", "This Month"];

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

  const category = [
    {
      name: "Backlog",
      tasks: [
        {
          title: "Task no 1",
          priority: "low",
          checklist: ["item1", "item2"],
          duedate: "2024/10/26",
          category: "backlog",
        },
        {
          priority: "high",
          checklist: ["item1", "item2"],
          duedate: "2024/10/22",
          category: "backlog",
        },
      ],
    },
    {
      name: "In progress",
      tasks: [],
    },
    {
      name: "To do",
      tasks: [
        {
          priority: "low",
          checklist: ["item1", "item2"],
          duedate: "2024/10/29",
          category: "to-do",
        },
      ],
    },
    {
      name: "Done",
      tasks: [],
    },
  ];

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
