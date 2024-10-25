import React, { useState } from "react";
import styles from "./settings.module.css";
import Panel from "../../components/Panel";
import Form from "../../components/Form";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    oldPassword: false,
    newPassword: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
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
      placeholder: "Update Email",
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
      placeholder: "Old Password",
      errorMsg: "Incorrect password",
      isError: error.oldPassword,
      value: formData.oldPassword,
      onChange: (e) =>
        setFormData({
          ...formData,
          oldPassword: e.target.value,
        }),
    },
    {
      type: "password",
      placeholder: "New Password",
      errorMsg:
        "Password should contain a sepcial character, a number, letters and minimum 8 characters lon",
      isError: error.cnewPassword,
      value: formData.newPassword,
      onChange: (e) =>
        setFormData({
          ...formData,
          newPassword: e.target.value,
        }),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Panel option="settings" />
      </div>
      <div className={styles.right}>
        <h2>Settings</h2>
        <Form
          fields={inputFields}
          onSubmit={handleSubmit}
          formType="Update"
        />
      </div>
    </div>
  );
}
