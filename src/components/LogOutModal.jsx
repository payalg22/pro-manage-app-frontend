import React from "react";
import styles from "./LogOutModal.module.css";
import Popup from "reactjs-popup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BasicModal from "./BasicModal";

export default function LogOutModal() {
  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
