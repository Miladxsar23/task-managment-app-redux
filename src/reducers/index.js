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
        tasks: [...state.tasks, action.payLoad.task],
        isLoading: false,
      };
    case "CHANGE_STATUS_SUCCEED":
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payLoad.task.id) {
          return action.payLoad.task;
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
        tasks: action.payLoad.tasks,
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
        error: action.payLoad.error.message,
      };
    default:
      return state;
  }
}
