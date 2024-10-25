import styles from "./Form.module.css";
import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { formIcons } from "../data/formIcons.jsx";

function FormField({ field }) {
  const { type, placeholder, errorMsg, isError, value, onChange } =
    field;
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState();

  useEffect(() => {
    setInputType(type);
  }, []);

  const handleViewPassword = () => {
    setIsVisible(true);
    setInputType("text");
  };

  const handleHidePassword = () => {
    setIsVisible(false);
    setInputType("password");
  };

  return (
    <>
      <div className={styles.inputBox}>
        {formIcons[type]}
        <input
          className={styles.input}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" ? (
          !isVisible ? (
            <VisibilityOutlinedIcon
              className={styles.icon}
              color="action"
              onClick={handleViewPassword}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className={styles.icon}
              color="action"
              onClick={handleHidePassword}
            />
          )
        ) : null}
      </div>
      <span className={styles.error}>{isError && <p>{errorMsg}</p>}</span>
    </>
  );
}

export default function Form({ fields, onSubmit, formType }) {
  return (
    <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
      {fields.map((field, index) => {
        return <FormField key={index} field={field} />;
      })}
      <input type="submit" className={styles.submit} value={formType} />
    </form>
  );
}
