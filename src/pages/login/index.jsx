import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingArt from "../../components/LandingArt";
import styles from "./login.module.css";
import Form from "../../components/Form";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    setError({
      email: false,
      password: false,
    });
  }, [formData]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const { email, password } = formData;

    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const checkEmail = emailRegEx.test(email);
    if (!checkEmail) {
      setError({ ...error, email: true });
    }
  }

  const inputFields = [
    {
      type: "text",
      placeholder: "Email",
      errorMsg: "Please enter valid email",
      isError: error.email,
      value: formData.email,
      onChange: (e) =>
        setFormData({
          ...formData,
          email: e.target.value,
        }),
    },
    {
      type: "password",
      placeholder: "Password",
      errorMsg: "Invalid user or password",
      isError: error.password,
      value: formData.password,
      onChange: (e) =>
        setFormData({
          ...formData,
          password: e.target.value,
        }),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LandingArt />
      </div>
      <div className={styles.right}>
        <h2>Login</h2>
        <Form fields={inputFields} onSubmit={handleSubmit} formType="Login" />
        <p className={styles.account}>Have no account yet?</p>
        <button className={styles.accbtn} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}
