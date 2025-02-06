import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5001/api";
setAuthorizationBearer();

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);
export function saveAccessToken(authResult) {
  localStorage.setItem("token", authResult.token);
  setAuthorizationBearer();
}

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}
export const getTasks = async () => {
  const { data } = await axios.get("/items");
  return data;
};

export const addTask = async (name) => {
  return await axios.post("/items", { name, isComplete: false });
};

export const setCompleted = async (id, name, isComplete) => {
  return await axios.put(`/items/${id}`, { name, isComplete });
};

export const deleteTask = async (id) => {
  return await axios.delete(`/items/${id}`);
};

export const register = async (name, password) => {

    return await axios.post('/register', { name, password });
   
};

export const login = async (name, password) => {
  const response = await axios.post('/login', { name, password });
  return response;
};