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
    case "FETCH_PROJECTS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_PROJECTS_SUCCEED": {
      const { projects } = action.payLoad;
      return {
        ...state,
        items: projects,
        isLoading: false,
      };
    }
    case "CREATE_TASK_SUCCEED": {
      const { task } = action.payLoad;
      const projectIndex = state.items.findIndex(
        (item) => item.id === task.projectId
      );
      const project = state.items[projectIndex];
      const newProject = {
        ...project,
        tasks: [...project.tasks, task],
      };
      return {
        ...state,
        isLoading: false,
        items: [
          ...state.items.slice(0, projectIndex),
          newProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }
    case "CHANGE_STATUS_SUCCEED": {
      const { task } = action.payLoad;
      const projectIndex = state.items.findIndex(
        (p) => p.id === task.projectId
      );
      const project = state.items[projectIndex];
      const taskIndex = project.tasks.findIndex((t) => t.id === task.id);
      const newTasks = [
        ...project.tasks.slice(0, taskIndex),
        task,
        ...project.tasks.slice(taskIndex + 1),
      ];
      const newProject = {
        ...project,
        tasks: newTasks,
      };
      return {
        ...state,
        isLoading: false,
        items: [
          ...state.items.slice(0, projectIndex),
          newProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }
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

