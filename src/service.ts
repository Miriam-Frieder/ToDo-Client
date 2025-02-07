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
    else if (error.response.status === 404) {
      alert('User not found')
    }
    else {
      alert(error.response.status + " - " + error.response.data.message);
    }
    return Promise.reject(error);
  }
);
export function saveAccessToken(authResult: { token: string }) {
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

export const addTask = async (name: string) => {
  return await axios.post("/items", { name, isComplete: false });
};

export const setCompleted = async (id: number, name: string, isComplete: boolean) => {
  return await axios.put(`/items/${id}`, { name, isComplete });
};

export const deleteTask = async (id: number) => {
  return await axios.delete(`/items/${id}`);
};

export const register = async (name: String, password: String) => {

  return await axios.post('/register', { name, password });

};

export const login = async (name: String, password: String) => {
  const response = await axios.post('/login', { name, password });
  return response;
};