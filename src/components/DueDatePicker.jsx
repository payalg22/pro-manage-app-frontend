import styles from "./DueDatePicker.module.css";
import React, { useRef } from "react";
import { getTodayISO, getDueModal } from "../utils/getDates";

export default function DueDatePicker({ due, onChange }) {
  const pickerRef = useRef(null);
  const today = getTodayISO();

  const handleCalendar = () => {
    if (pickerRef.current) {
      pickerRef.current.showPicker();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  }

  return (
    <div className={styles.container}>
      <span className={styles.display}>
        {due ? getDueModal(due) : "Select Due Date"}
      </span>
      <input
        type="date"
        onClick={handleCalendar}
        ref={pickerRef}
        min={today}
        className={styles.picker}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        onChange={handleChange}
      />
    </div>
  );
}
