import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Panel.module.css";
import logo from "../assets/logo.png";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import LogOutModal from "./LogOutModal";

export default function Panel({ option }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} />
        <p>ProManage</p>
      </div>
      <div
        className={option === "dashboard" ? styles.isSelected : styles.options}
        onClick={() => navigate("/dashboard")}
      >
        <SpaceDashboardOutlinedIcon />
        <p>Board</p>
      </div>
      <div
        className={option === "analytics" ? styles.isSelected : styles.options}
        onClick={() => navigate("/analytics")}
      >
        <AnalyticsOutlinedIcon />
        <p>Analytics</p>
      </div>
      <div
        className={option === "settings" ? styles.isSelected : styles.options}
        onClick={() => navigate("/settings")}
      >
        <SettingsOutlinedIcon />
        <p>Settings</p>
      </div>
      <div className={styles.logout}>
        <LogOutModal />
      </div>
    </div>
  );
}
