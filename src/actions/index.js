import * as api from "../api";
import { CALL_API } from "../middleware/api";
export const FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED";
export const FETCH_TASKS_SUCCEED = "FETCH_TASKS_SUCCEED";
export const FETCH_TASKS_FAILED = "FETCH_TASKS_FAILED";
function createTaskSucceed(task) {
  return {
    type: "CREATE_TASK_SUCCEED",
    payLoad: { task },
    meta: {
      analytics: {
        event: "create_task",
        data: {
          id: task.id,
        },
      },
    },
  };
}
function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    setTimeout(() => {
      api.createTask({ title, description, status }).then((resp) => {
        dispatch(createTaskSucceed(resp.data));
      });
    }, 2000);
  };
}

function changeStatusSucceed(task) {
  return {
    type: "CHANGE_STATUS_SUCCEED",
    payLoad: { task },
  };
}
function changeStatus(id, params = {}) {
  return (dispatch, getState) => {
    let task = getTaskById(getState().tasks.tasks, id);
    let updatedTask = Object.assign({}, task, params);
    setTimeout(() => {
      api.changeStatus(id, updatedTask).then((resp) => {
        dispatch(changeStatusSucceed(resp.data));
      });
    }, 500);
  };
}
function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}
// function fetchTasksSucceed(tasks) {
//   return {
//     type: "FETCH_TASKS_SUCCEED",
//     payLoad: { tasks },
//   };
// }
function fetchTasks() {
  return {
    [CALL_API]: {
      types: ["FETCH_TASKS_STARTED", "FETCH_TASKS_SUCCEED", "FETCH_TASKS_FAILED"],
      endpiont: "/tasks",
    },
  };
}
// function fetchTasksStarted() {
//   return {
//     type: "FETCH_TASKS_STARTED",
//   };
// }

// function fetchTasksFailed(error) {
//   return {
//     type: "FETCH_TASKS_FAILED",
//     payLoad: {
//       error,
//     },
//   };
// }
export { createTask, changeStatus, fetchTasks };
