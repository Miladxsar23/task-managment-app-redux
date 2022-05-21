import * as api from "../api";
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
    dispatch(requestStarted());
    api
      .createTask({ title, description, status })
      .then((resp) => {
        dispatch(createTaskSucceed(resp.data));
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
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
    dispatch(requestStarted());
    const task = getState().tasks.tasks.find((t) => t.id === id);
    const newTask = Object.assign({}, task, params);
    api
      .changeStatus(id, newTask)
      .then((resp) => {
        dispatch(changeStatusSucceed(resp.data));
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
}
function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}
// function fetchTasksSucceed(tasks) {
//   return {
//     type: "FETCH_TASKS_SUCCEED",
//     payLoad: { tasks },
//   };
// }
// function fetchTasks() {
//   return (dispatch) => {
//     dispatch(requestStarted());
//     api.fetchTasks().then((resp) => {
//       dispatch(fetchTasksSucceed(resp.data));
//     });
//   };
// }
function fetchTasks() {
  return fetchTasksStarted()
}
function requestStarted() {
  return {
    type: "REQUEST_STARTED",
  };
}

function requestFailed(error) {
  return {
    type: "REQUEST_FAILED",
    payLoad: {
      error,
    },
  };
}
export { createTask, changeStatus, fetchTasks };
