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
      password: !password,
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
