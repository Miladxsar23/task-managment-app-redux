const initialState = {
  tasks: [],
  isLoading: false,
  error: "",
};
export default function tasks(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK_SUCCEED":
      return {
        ...state,
        tasks: [...state.tasks, action.payLoad],
        isLoading: false,
      };
    case "CHANGE_STATUS_SUCCEED":
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payLoad.id) {
          return action.payLoad;
        }
        return task;
      });
      return {
        ...state,
        tasks: newTasks,
        isLoading: false,
      };
    case "FETCH_TASKS_SUCCEED":
      return {
        ...state,
        tasks: action.payLoad,
        isLoading: false,
      };
    case "DELETE_TASK_SUCCEED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payLoad),
      };
    case "REQUEST_STARTED":
      return {
        ...state,
        isLoading: true,
      };
    case "REQUEST_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad.error,
      };
    default:
      return state;
  }
}
