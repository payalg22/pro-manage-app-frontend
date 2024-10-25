import React from "react";
import styles from "./LandingArt.module.css";
import hero from "../assets/Group.png";

export default function LandingArt() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.imgcontainer}>
          <div className={styles.circle}>
            <img src={hero} className={styles.heroimg} />
          </div>
        </div>
        <div className={styles.tagline}>
          <p className={styles.heading}>Welcome aboard my friend</p>
          <p className={styles.subheading}>
            just a couple of clicks and we start
          </p>
        </div>
      </div>
    </div>
  );
}
