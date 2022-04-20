const mockTasks = [
  {
    id: 1,
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Peace on Earth",
    description: "No big deal.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Peace on Earth",
    description: "No big deal.",
    status: "Unstarted",
  },
];
export default function tasks(state = { tasks: mockTasks }, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.payLoad.newTask],
      });
    default:
      return state;
  }
}
