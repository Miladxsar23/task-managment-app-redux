import { createSelector } from "reselect";
import { getTaskSearchTerm as getSearchTerm } from "./page";
import { TASK_STATUS } from "../constants";
const initialState = {
  items: {},
  isLoading: false,
  error: null,
};
function projects(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payLoad;
      if (entities && entities.projects) {
        console.log(state)
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }
      console.log(state)
      return state;
    }
    case "FETCH_PROJECTS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_PROJECTS_FAILED": {
      const { error } = action.payLoad;
      return {
        ...state,
        isLoading: false,
        error: error.message,
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
    default:
      return state;
  }
}

/* Selectors function for this reducer */

//input selector
export const getProjects = (state) => {
  return Object.keys(state.projects.items).map((projectId) => {
    const project = state.projects.items[projectId];
    return project;
  });
};
const getTaskByProjectId = (state) => {
  const { currentProjectId } = state.page;
  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }
  const tasksId = state.projects.items[currentProjectId].tasks;
  console.log(state.tasks)
  return tasksId.map((id) => state.tasks.items[Number(id)]);
};

//memoizing selector

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

export default projects;
