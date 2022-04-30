import { v4 as uuid } from "uuid";
import axios from "axios";
function createTask({ title, description }) {
  return {
    type: "CREATE_TASK",
    payLoad: {
      id: uuid(),
      title: title,
      description: description,
      status: "Unstarted",
    },
  };
}
function changeStatus(id, params = {}) {
  return {
    type: "CHANGE_STATUS",
    payLoad: { id, params },
  };
}

function fetchTasksSucceeded(tasks) {
  return {
    type: "FETCH_TASK_SUCCESSED",
    payLoad: { tasks },
  };
}

async function fetchTasks() {
  return (dispatch) => {
    axios.get("http://localhost:3001/tasks").then((resp) => {
      dispatch(fetchTasksSucceeded(resp.data));
    });
  };
}

export { createTask, changeStatus, fetchTasks };
