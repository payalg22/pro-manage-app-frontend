import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LandingArt from "../../components/LandingArt";
import styles from "./login.module.css";
import Form from "../../components/Form";
import { validateLogin } from "../../utils/validateForm";
import { login } from "../../services/auth";
import AppContext from "../../context/AppContext";

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
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    const { isValid, invalidFields } = validateLogin(formData);
    setError(invalidFields);
    if (isValid) {
      setError({
        email: false,
        password: false,
      });
      const res = await login(formData);
      try {
        if (res?.status === 200) {
          const token = await res.data.token;
          const user = await res.data.user;
          setUser(user);
          localStorage.setItem("token", token);
          localStorage.setItem("username", user);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        } else {
          setFormError(res.data.message);
        }
      } catch (error) {
        setFormError(res?.data?.message);
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
