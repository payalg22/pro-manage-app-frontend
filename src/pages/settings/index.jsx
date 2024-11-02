import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Panel from "../../components/Panel";
import Form from "../../components/Form";
import { getUserDetails, updateUser } from "../../services/user";
import { validateUser } from "../../utils/validateForm";
import { toast, ToastContainer } from "react-toastify";
{
}

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
  const [formError, setFormError] = useState("");
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDetails().then((res) => {
      if (res.status === 200) {
        const { userInfo } = res.data;
        setFormData({
          ...formData,
          name: userInfo.name,
          email: userInfo.email,
          _id: userInfo._id,
        });
        setUserData(userInfo);
      }
    });
  }, []);

  useEffect(() => {
    setError({
      name: false,
      email: false,
      oldPassword: false,
      newPassword: false,
    });
    setFormError(false);
  }, [formData]);

  async function handleSubmit(e) {
    let change = 0;

    Object.keys(formData).forEach((item) => {
      if (item === "name" || item === "email") {
        if (formData[item] !== userData[item]) {
          change++;
        }
      } else {
        if (item === "newPassword" && formData[item]) {
          change++;
        }
      }
    });
    if (change > 1) {
      setFormError("Only one field can be changed at a time");
      return;
    }

    if (change === 0) {
      return;
    }
    //  todo form validation
    const { isValid, invalidFields } = validateUser(formData);
    if (!isValid) {
      setError(invalidFields);
      return;
    }

    const res = await updateUser(formData);
    if (res.status === 201) {
      notify();
      return;
      //ToDO logout: clear localstorage token
    } else {
      setFormError(
        res?.data?.message || "Something went wrong. Please try again"
      );
      return;
    }
  }

  const notify = () => {
    toast(`Changes Saved`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

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
      errorMsg: "Please enter password",
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
      errorMsg: error.newPassword,
      isError: error.newPassword,
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
        <ToastContainer />
        <h2>Settings</h2>
        {formError && <p className={styles.error}>{formError}</p>}
        <Form fields={inputFields} onSubmit={handleSubmit} formType="Update" />
      </div>
    </div>
  );
}
