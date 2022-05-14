const initialState = {
  tasks: [],
  isLoading: false,
  error: "",
};
export default function tasks(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK_SUCCEED":
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.payLoad.task],
        isLoading: false,
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
        isLoading: false,
      });
    case "FETCH_TASKS_SUCCEED":
      return Object.assign({}, state, {
        tasks: action.payLoad.tasks,
        isLoading: false,
      });
    case "FETCH_TASKS_STARTED":
      return Object.assign({}, state, {
        isLoading: true,
      });
    case "FETCH_TASKS_FAILED":
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payLoad.error,
      });
    default:
      return state;
  }
}
