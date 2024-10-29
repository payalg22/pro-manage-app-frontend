import React from "react";
import styles from "./LogOutModal.module.css";
import Popup from "reactjs-popup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import BasicModal from "./BasicModal";

export default function LogOutModal() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //TODO clear jwt from localstorage and context
    console.log("user logged out");
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <Popup
      trigger={
        <div className={styles.logout}>
          <LogoutOutlinedIcon color="#CF3636" />
          <p>Log out</p>
        </div>
      }
      modal
      overlayStyle={{ background: "rgba(48, 61, 67, 0.55)" }}
    >
      {(close) => (
        <BasicModal
          modalFor="Logout"
          close={close}
          handleAction={handleLogout}
        />
      )}
    </Popup>
  );
}
