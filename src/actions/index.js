import * as api from "../api";
function createTaskSucceed(task) {
  return {
    type: "CREATE_TASK_SUCCEED",
    payLoad: { task },
  };
}
function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      dispatch(createTaskSucceed(resp.data));
    });
  };
}

function changeStatusSucceed(task) {
  return {
    type : "CHANGE_STATUS_SUCCEED", 
    payLoad : {task}
  }
}
function changeStatus(id, params = {}) {
  return (dispatch, getState) => {
    let task = getTaskById(getState().tasks, id)
    let updatedTask = Object.assign({}, task, params)
    console.log(params)
    api.changeStatus(id, updatedTask).then(resp => {
      dispatch(changeStatusSucceed(resp.data))
    })
  }
}
function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id)
}
function fetchTasksSucceed(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEED",
    payLoad: { tasks },
  };
}
function fetchTasks() {
  return (dispatch) => {
    api.fetchTasks().then((resp) => {
      dispatch(fetchTasksSucceed(resp.data));
    });
  };
}
export { createTask, changeStatus, fetchTasks };
