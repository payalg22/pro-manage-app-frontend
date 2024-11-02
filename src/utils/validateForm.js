export default function validateForm({
  name,
  email,
  password,
  confirmPassword,
}) {
  let isValid = true;
  let invalidFields = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  if (!name || !email || !password || !confirmPassword) {
    isValid = false;
    invalidFields = {
      name: !name,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword,
    };
  }

  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passRegEx = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  const checkEmail = emailRegEx.test(email);
  const checkPass = passRegEx.test(password);
  if (!checkEmail || !checkPass) {
    invalidFields = {
      ...invalidFields,
      email: !checkEmail,
      password: !checkPass,
    };
    isValid = false;
    return {
      isValid,
      invalidFields,
    };
  }

  if (password !== confirmPassword) {
    invalidFields = {
      ...invalidFields,
      confirmPassword: true,
    };
    isValid = false;
  }

  return {
    isValid,
    invalidFields,
  };
}

export function validateLogin({ email, password }) {
  let isValid = true;
  let invalidFields = {
    email: false,
    password: false,
  };

  if (!email || !password) {
    isValid = false;
    invalidFields = {
      email: !email,
      password: !password,
    };
  }

  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const checkEmail = emailRegEx.test(email);
  if (!checkEmail) {
    isValid = false;
    invalidFields = {
      email: !checkEmail,
    };
  }

  return { isValid, invalidFields };
}

export function validateTask({ title, checklist, priority }) {
  let isValid = true;
  let invalidFields = {
    title: false,
    priority: false,
    checklist: false,
  };
  if (!checklist?.length || !title || !priority) {
    invalidFields = {
      checklist: !checklist?.length,
      title: !title,
      priority: !priority,
    };
    isValid = false;
  }

  return { isValid, invalidFields };
}

export function validateUser({ email, name, newPassword, oldPassword }) {
  let isValid = true;
  let invalidFields = {
    email: false,
    password: false,
  };

  if (!email || !name) {
    isValid = false;
    invalidFields = {
      email: !email,
      name: !name,
    };
  }

  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passRegEx = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  const checkEmail = emailRegEx.test(email);
  const checkPass = passRegEx.test(newPassword);
  if (!checkEmail) {
    invalidFields = {
      ...invalidFields,
      email: !checkEmail,
    };
    isValid = false;
  }

  if (newPassword && !checkPass) {
    invalidFields = {
      ...invalidFields,
      newPassword:
        "Password should contain a sepcial character, a number, letters and minimum 8 characters long",
    };
    isValid = false;
  }

  if (newPassword && newPassword === oldPassword) {
    invalidFields = {
      ...invalidFields,
      newPassword: "New password can't be same as old password",
    };
    isValid = false;
  }

  if (newPassword && !oldPassword) {
    invalidFields = {
      ...invalidFields,
      oldPassword: true,
    };
    isValid = false;
  }

  return { isValid, invalidFields };
}
