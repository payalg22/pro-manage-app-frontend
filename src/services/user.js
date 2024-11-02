import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export const getUserList = async () => {
  try {
    const response = await axios.get(`${url}/api/v1/user`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(
      `${url}/api/v1/user/details`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateUser = async (details) => {
  const data = JSON.stringify(details);
  try {
    const response = await axios.put(
      `${url}/api/v1/user/update`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
