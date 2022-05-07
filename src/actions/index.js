import * as api from "../api";
function createTaskSucceed(task) {
  return {
    type: "CREATE_TASK_SUCCEED",
    payLoad: { task },
  };
}
function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    dispatch(fetchTasksStarted());
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
    api.changeStatus(id, updatedTask).then((resp) => {
      dispatch(changeStatusSucceed(resp.data));
    });
  };
}
function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}
function fetchTasksSucceed(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEED",
    payLoad: { tasks },
  };
}
function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());
    api
      .fetchTasks()
      .then((resp) => {
        setTimeout(() => {
          dispatch(fetchTasksSucceed(resp.data));
        }, 2000);
      })
      .catch(failure => dispatch(fetchTasksFailed(failure.message)));
  };
}
function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payLoad: {
      error,
    },
  };
}
export { createTask, changeStatus, fetchTasks };
