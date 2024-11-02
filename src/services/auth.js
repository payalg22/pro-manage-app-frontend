import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;

export async function register(data) {
  try {
    const response = await axios.post(
      `${url}/api/v1/user/register`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(data) {
  try {
    const response = await axios.post(
      `${url}/api/v1/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}
