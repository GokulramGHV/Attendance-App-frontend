export const API_BASE_URL = "https://attendanceapp.up.railway.app/";
// export const API_BASE_URL = "http://127.0.0.1:8000/";

export const request = async (
  endpoint,
  method = "GET",
  data = {},
  response_type = "json"
) => {
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
  const auth = token ? "Bearer " + token : "";
  const response = await fetch(url, {
    // mode: "no-cors",
    method: method,
    responseType: response_type,
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

export const createCourse = (data) => {
  return request("course/", "POST", data);
};

export const getCourse = (id) => {
  return request(`course/${id}/`, "GET");
};

export const getCourseStudents = (id) => {
  return request(`course/${id}/students/`, "GET");
};

export const getTimetables = () => {
  return request("timetable/", "GET");
};

export const createTimetableEntry = (data) => {
  return request("timetable/", "POST", data);
};

export const createSession = (data) => {
  return request("sessions/", "POST", data);
};

export const getSessionDetails = (id) => {
  return request(`sessions/${id}/`, "GET");
};

export const submitAttendance = (data) => {
  return request("attendance/", "POST", data);
};

export const getCourseSessions = (id) => {
  return request(`course/${id}/sessions/`, "GET");
};

export const getSessionAttendance = (id) => {
  return request(`attendance/session/${id}/`, "GET");
};

export const submitBulkAttendance = (data, cid, sid) => {
  return request(`bulkAttendance/${cid}/${sid}/`, "POST", data);
};

export const getStudent = (id) => {
  return request(`student/${id}/`, "GET");
};

export const createStudent = (data) => {
  return request("student/", "POST", data);
};

export const filetest = (sid, cid) => {
  return request(`filetest/${cid}/${sid}/`, "GET", {}, "blob");
};

export const all_sessions_attendance = (cid) => {
  return request(`all_sessions_attendance/${cid}/`, "GET", {}, "blob");
};

export const getUser = () => {
  return request("auth/user/", "GET");
};

export const register = (data) => {
  return request("auth/registration/", "POST", data);
};

export const updateUser = (data) => {
  return request("auth/user/", "PATCH", data);
};
