import { CALL_API } from "../middleware/api";
export const FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED";
export const FETCH_TASKS_SUCCEED = "FETCH_TASKS_SUCCEED";
export const FETCH_TASKS_FAILED = "FETCH_TASKS_FAILED";
// function createTaskSucceed(task) {
//   return {
//     type: "CREATE_TASK_SUCCEED",
//     payLoad: { task },
//     meta: {
//       analytics: {
//         event: "create_task",
//         data: {
//           id: task.id,
//         },
//       },
//     },
//   };
// }
function createTask({ title, description, status = "Unstarted" }) {
  return {
    [CALL_API]: {
      types: ["REQUEST_STARTED", "CREATE_TASK_SUCCEED", "REQUEST_FAILED"],
      endpoint: "/tasks",
      method: "POST",
      body: { title, description, status },
    },
  };
}

// function changeStatusSucceed(task) {
//   return {
//     type: "CHANGE_STATUS_SUCCEED",
//     payLoad: { task },
//   };
// }
function changeStatus(id, params = {}) {
  return {
    [CALL_API]: {
      types: ["REQUEST_STARTED", "CHANGE_STATUS_SUCCEED", "REQUEST_FAILED"],
      endpoint: `/tasks/${id}`,
      method: "PUT",
      body: params,
    },
  };
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
      types: ["REQUEST_STARTED", "FETCH_TASKS_SUCCEED", "REQUEST_FAILED"],
      endpoint: "/tasks",
      method: "GET",
    },
  };
}
function deleteTask(id) {
  return {
    [CALL_API] : {
      types: ["REQUEST_STARTED", "DELETE_TASK_SUCCEED", "REQUEST_FAILED"],
      endpoint: `/tasks/${id}`,
      method: "DELETE",
    }
  }
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
export { createTask, changeStatus, fetchTasks, deleteTask };
