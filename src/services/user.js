import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export const getUserList = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/user`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
