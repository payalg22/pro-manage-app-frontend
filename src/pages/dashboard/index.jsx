import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./dashboard.module.css";
import Panel from "../../components/Panel";
import Category from "../../components/Category";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PendingIcon from "@mui/icons-material/Pending";
import { getToday } from "../../utils/getDates";
import AddMemberModal from "../../components/AddMemberModal";
import { taskFilter } from "../../services/task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
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
  const [pageRefresh, setPageRefresh] = useState(true);
  const { user } = useContext(AppContext);

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
    if (pageRefresh) {
      getTasks().then((tasks) => {
        if (tasks) {
          const { backlogTasks, doneTasks, inProgressTasks, toDoTasks } = tasks;
          setCategory([
            { name: "Backlog", tasks: backlogTasks },
            { name: "To Do", tasks: toDoTasks },
            { name: "In Progress", tasks: inProgressTasks },
            { name: "Done", tasks: doneTasks },
          ]);
          setIsLoading(false);
        }
      });
      setPageRefresh(false);
    }
  }, [pageRefresh]);

  const notify = (msg) => {
    toast(`${msg}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    }); 
  };

  const getTasks = async () => {
    const selectedFilter = filter?.split(" ")[1]?.toLowerCase();
    const res = await taskFilter(selectedFilter);
    if (res?.status === 200) {
      return res.data;
    }
    return false;
  };

  const handleRefresh = (val) => {
    setPageRefresh(val);
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelection = (value) => {
    setFilter(value);
    handleMenu();
    setPageRefresh(true);
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <PendingIcon />
          <p>Loading </p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <Panel option="dashboard" />
          </div>
          <div className={styles.right}>
            <ToastContainer />
            <div className={styles.welcome}>Welcome! {user}</div>
            <div>
              <p className={styles.date}>{getToday()}</p>
            </div>
            <div className={styles.header}>
              <p>Board</p>
              <AddMemberModal pageRefresh={handleRefresh} toast={notify} />
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
                    <Category
                      category={item.name}
                      tasks={item.tasks}
                      pageRefresh={handleRefresh}
                      toast={notify}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
