import { v4 as uuid } from "uuid";
import * as api from "../api";
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

function fetchTasksSucceed(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEED",
    payLoad: { tasks },
  };
}
function fetchTasks() {
  return (dispatch) => {
    api.fetchTasks().then(resp => {
      dispatch(fetchTasksSucceed(resp.data))
    })
  };
}
export { createTask, changeStatus, fetchTasks };
