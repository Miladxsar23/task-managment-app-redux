import { v4 as uuid } from "uuid";
const mockTasks = [
  {
    id: uuid(),
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    status: "In Progress",
  },
  {
    id: uuid(),
    title: "Peace on Earth",
    description: "No big deal.",
    status: "In Progress",
  },
  {
    id: uuid(),
    title: "Peace on Earth",
    description: "No big deal.",
    status: "Unstarted",
  },
];
export default function tasks(state = { tasks: mockTasks }, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.payLoad],
      });
    case "CHANGE_STATUS":
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payLoad.id) {
          return Object.assign({}, task, action.payLoad.params);
        }
        return task;
      });
      return Object.assign({}, state, {
        tasks: newTasks,
      });
    default:
      return state;
  }
}
