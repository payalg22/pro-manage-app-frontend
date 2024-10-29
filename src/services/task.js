import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export async function taskFilter(filter) {
    console.log(token);
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/task/user/${filter}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
