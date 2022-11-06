// const API_BASE_URL = 'https://capstone-301-task-app.herokuapp.com/api/';
const API_BASE_URL = "http://127.0.0.1:8000/";

export const request = async (endpoint, method = "GET", data = {}) => {
  let url;
  let payload;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token Authentication
  const token = localStorage.getItem("token");
  // console.log(token);
  const auth = token ? "Bearer " + localStorage.getItem("token") : "";
  const response = await fetch(url, {
    // mode: "no-cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth.trim(),
    },
    body: method !== "GET" ? payload : null,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw errorJson;
    // return errorJson;
  }
};
export const login = (username, password) => {
  return request("auth/login/", "POST", {
    username: username,
    password: password,
  });
};

export const getCourses = () => {
  return request("course/", "GET");
};
