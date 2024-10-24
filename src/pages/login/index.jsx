import React from "react";
import LandingArt from "../../components/LandingArt";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LandingArt />
      </div>
      <div className={styles.right}>
        <h2>Login</h2>
      </div>
    </div>
  );
}
