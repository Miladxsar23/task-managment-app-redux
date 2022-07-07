const initialState = {
  error: null,
  isLoading: false,
  items: {},
};
function tasks(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "REQUEST_FAILED": {
      const { error } = action.payLoad;
      return {
        ...state,
        error: error.message,
      };
    }
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payLoad;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }
      return state;
    }
    case "TIMER_INCREAMENT": {
      const { taskId } = action.payLoad;
      const task = state.items[taskId];
      return {
        ...state,
        items: {
          ...state.items,
          [taskId]: {
            ...task,
            timer: task.timer + 1,
          },
        },
      };
    }
    case "CHANGE_STATUS_SUCCEED": {
      const { task } = action.payLoad;
      const taskId = task.id;
      return {
        ...state,
        isLoading: false,
        items: {
          ...state.items,
          [taskId]: task,
        },
      };
    }
    case "CREATE_TASK_SUCCEED": {
      const { task } = action.payLoad;
      return {
        ...state,
        isLoading: false,
        items: {
          ...state.items,
          [task.id]: task,
        },
      };
    }
    default:
      return state;
  }
}
export default tasks;
