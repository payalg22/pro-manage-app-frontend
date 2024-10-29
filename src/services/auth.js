import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;

export async function register(data) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/user/register`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function login(data) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
