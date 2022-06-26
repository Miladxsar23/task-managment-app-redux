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
function createTask({
  title,
  description,
  status = "Unstarted",
  timer = 0,
  projectId,
}) {
  return (dispatch) => {
    dispatch(requestStarted());
    api
      .createTask({ title, description, status, timer, projectId })
      .then((resp) => {
        dispatch(createTaskSucceed(resp.data));
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
}

function editTaskSucceed(task) {
  return {
    type: "CHANGE_STATUS_SUCCEED",
    payLoad: { task },
  };
}
function editTask(id, params = {}) {
  return (dispatch, getState) => {
    dispatch(requestStarted());
    const task = getState().tasks.items[id]
    const newTask = {...task, ...params}
    api
      .changeStatus(id, newTask)
      .then((resp) => {
        dispatch(editTaskSucceed(resp.data));
        if (resp.data.status === "In Progress") {
          return dispatch(progressTimerStart(resp.data.id));
        }
        if (task.status === "In Progress") {
          return dispatch(progressTimerStop(resp.data.id));
        }
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
  return fetchTasksStarted();
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

function progressTimerStart(taskId) {
  return {
    type: "TIMER_STARTED",
    payLoad: { taskId },
  };
}
function progressTimerStop(taskId) {
  return {
    type: "TIMER_STOPPED",
    payLoad: { taskId },
  };
}

function filterTasks(searchTerm) {
  return {
    type: "FILTER_TASKS",
    payLoad: { searchTerm },
  };
}
export { createTask, editTask, fetchTasks, filterTasks };
