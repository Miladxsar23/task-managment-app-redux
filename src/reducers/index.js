export default function tasks(state = { tasks: [] }, action) {
  switch (action.type) {
    case "CREATE_TASK_SUCCEED":
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.payLoad.task],
      });
    case "CHANGE_STATUS_SUCCEED":
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payLoad.task.id) {
          return action.payLoad.task;
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
