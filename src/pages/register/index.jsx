import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingArt from "../../components/LandingArt";
import styles from "../login/login.module.css";
import Form from "../../components/Form";
import validateForm from "../../utils/validateForm";
import { register } from "../../services/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    setError({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setFormError("");
  }, [formData]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { isValid, invalidFields } = validateForm(formData);
    setError(invalidFields);
    if (isValid) {
      setError({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
      const res = await register(formData);
      console.log(res);
      try {
        if (res?.status === 201) {
          navigate("/login");
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
      placeholder: "Name",
      errorMsg: "Please enter name",
      isError: error.name,
      value: formData.name,
      onChange: (e) =>
        setFormData({
          ...formData,
          name: e.target.value,
        }),
    },
    {
      type: "email",
      placeholder: "Email",
      errorMsg: "Please enter a valid email",
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
      errorMsg:
        "Password should contain a sepcial character, a number, letters and minimum 8 characters long",
      isError: error.password,
      value: formData.password,
      onChange: (e) =>
        setFormData({
          ...formData,
          password: e.target.value,
        }),
    },
    {
      type: "password",
      placeholder: "Password",
      errorMsg: "Password doesn't match",
      isError: error.confirmPassword,
      value: formData.confirmPassword,
      onChange: (e) =>
        setFormData({
          ...formData,
          confirmPassword: e.target.value,
        }),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LandingArt />
      </div>
      <div className={styles.right}>
        <h2>Register</h2>
        {formError && <p className={styles.error}>{formError}</p>}
        <Form
          fields={inputFields}
          onSubmit={handleSubmit}
          formType="Register"
        />
        <p className={styles.account}>Have an account?</p>
        <button className={styles.accbtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}
