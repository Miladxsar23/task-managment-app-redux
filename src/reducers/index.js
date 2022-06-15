import { createSelector } from "reselect";
import { TASK_STATUS } from "../constants";
const initialState = {
  tasks: [],
  isLoading: false,
  error: "",
  searchTerm: "",
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
    case "TIMER_INCREAMENT":
      const tasks = state.tasks.map((t) => {
        if (t.id === action.payLoad.taskId) {
          return { ...t, timer: ++t.timer };
        }
        return t;
      });
      return { ...state, tasks: tasks };
    case "FILTER_TASKS":
      return {
        ...state,
        searchTerm: action.payLoad.searchTerm,
      };
    default:
      return state;
  }
}

/* Selectors function for this reducer */
const getTasks = (state) => state.tasks.tasks;
const getSearchTerm = (state) => state.tasks.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) => {
      return task.title.match(new RegExp(searchTerm), "i");
    });
  }
);
export const getFilteredSpliteTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const groupTasks = {}
    TASK_STATUS.map((status) => {
      groupTasks[status] = tasks.filter((t) => t.status === status);
    });
    return groupTasks;
  }
);
