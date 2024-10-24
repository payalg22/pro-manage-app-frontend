import React from "react";
import LandingArt from "../../components/LandingArt";
import styles from "../login/login.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LandingArt />
      </div>
      <div className={styles.right}>
        <h2>Register</h2>
      </div>
    </div>
  );
}
