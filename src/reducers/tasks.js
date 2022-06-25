const initialState = {
  error: null,
  isLoading: false,
  items: {},
};
function tasks(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
      const {entities} = action.payLoad;
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
      const nextTasks = Object.keys(state.items).map((taskId) => {
        const task = state.items[taskId];
        if (taskId === action.payLoad.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    default:
      return state;
  }
}
export default tasks;
