import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const handleApiResponse = (res) => {
  if (res?.status === 401) {
    if(localStorage.getItem("token")) {
        window.location.reload();
        return res;
    }
    localStorage.removeItem("token");
    alert("Please login and try again");
    window.location.href = "/login";
    return null;
  } else {
    return res;
  }
};

export async function taskFilter(filter) {
  try {
    const response = await axios.get(
      `${url}/api/v1/task/user/${filter}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
}

export const getSharedTask = async (id) => {
  try {
    const response = await axios.get(
      `${url}/api/v1/task/specific/${id}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const postNewTask = async (task) => {
  const data = JSON.stringify(task);
  try {
    const response = await axios.post(
      `${url}/api/v1/task/new`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(
      `${url}/api/v1/task/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const changeCategory = async (id, category) => {
  try {
    const response = await axios.patch(
      `${url}/api/v1/task/edit/${id}/${category}`,
      [],
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const getAnalytics = async () => {
  try {
    const response = await axios.get(
      `${url}/api/v1/task/analytics/all`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const updateTask = async (id, task) => {
  const data = JSON.stringify(task);
  try {
    const response = await axios.put(
      `${url}/api/v1/task/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const changeListStatus = async (id, item) => {
  try {
    const response = await axios.patch(
      `${url}/api/v1/task/list/${id}`,
      item,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};

export const addMember = async (user) => {
  const data = JSON.stringify(user);
  try {
    const response = await axios.patch(
      `${url}/api/v1/task/member`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse(error);
  }
};
