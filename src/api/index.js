import axios from "axios";
const API_BASE_URL = "http://localhost:3001";
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST"
  },
});

function fetchTasks() {
  return client.get("/tasks");
}

function createTask(params) {
  return client.post("/tasks", params);
}

function changeStatus(id, params) {
  return client.put(`/tasks/${id}`, params);
}
export { fetchTasks, createTask, changeStatus };
