import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export async function taskFilter(filter) {
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

export const getSharedTask = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/task/specific/${id}`,
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
};

export const postNewTask = async (task) => {
  const data = JSON.stringify(task);
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/task/new`,
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
    console.log(error);
    return error.response;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/task/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const changeCategory = async (id, category) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/task/edit/${id}/${category}`,
      [],
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
};

export const getAnalytics = async () => {
    try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/task/analytics/all`,
          {
            headers: {
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
