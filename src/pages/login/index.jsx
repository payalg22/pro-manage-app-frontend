import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingArt from "../../components/LandingArt";
import styles from "./login.module.css";
import Form from "../../components/Form";
import { validateLogin } from "../../utils/validateForm";
import { login } from "../../../services/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    setError({
      email: false,
      password: false,
    });
    setFormError("");
  }, [formData]);

  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const { isValid, invalidFields } = validateLogin(formData);
    setError(invalidFields);
    if (isValid) {
      setError({
        email: false,
        password: false,
      });
      const res = await login(formData);
      console.log(res);
      try {
        if (res?.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/dashboard");
        } else {
          setFormError(res.data.message);
        }
      } catch (error) {
        setFormError(res.data.message);
      }
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
      errorMsg: "Please enter password",
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
        {formError && <p className={styles.error}>{formError}</p>}
        <Form fields={inputFields} onSubmit={handleSubmit} formType="Login" />
        <p className={styles.account}>Have no account yet?</p>
        <button className={styles.accbtn} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}
