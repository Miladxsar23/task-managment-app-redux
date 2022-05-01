export default function tasks(state = { tasks: [] }, action) {
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
    case "FETCH_TASKS_SUCCEED":
      return Object.assign({}, state, {
        tasks: action.payLoad.tasks,
      });
    default:
      return state;
  }
}
