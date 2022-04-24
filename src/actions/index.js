import { v4 as uuid } from "uuid";

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
function changeStatus({ id, newStatus }) {
  return {
    type: "CHANGE_STATUS",
    payLoad: { id, newStatus },
  };
}

export { createTask, changeStatus };
