import { createSelector } from "reselect";
import { TASK_STATUS } from "../constants";
import {
  getTaskSearchTerm as getSearchTerm,
  getCurrentProjectId,
} from "./page";
/* initial state for projects tree node */
const initialState = {
  items: [],
  isLoading: false,
  error: "",
};
/* projects reducer */
export default function projects(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PROJECTS_SUCCEED":
      const { projects } = action.payLoad;
      return {
        ...state,
        items: projects,
        isLoading: false,
      };
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

//input selector
const getProjects = (state) => state.projects;
//memoizing selector
const getTaskByProjectId = createSelector(
  [getProjects, getCurrentProjectId],
  (projects, currentProjectId) => {
    if (!currentProjectId) return [];
    else {
      const project = projects.items.find((p) => p.id === currentProjectId);
      return project.tasks;
    }
  }
);

export const getFilteredTasks = createSelector(
  [getTaskByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) => {
      return task.title.match(new RegExp(searchTerm), "i");
    });
  }
);
export const getGroupAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const groupTasks = {};
    TASK_STATUS.map((status) => {
      groupTasks[status] = tasks.filter((t) => t.status === status);
    });
    return groupTasks;
  }
);
