import { createSelector } from "reselect";
let initialState = {
  items: [],
  isLoading: false,
  error: null,
};
function projectReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PROJECTS_FAILED":
      const { error } = action.payLoad;
      return {
        ...state,
        isLoading: false,
        error: error.message,
      };
    case "FETCH_PROJECTS_SUCCEED":
      const { projects } = action.payLoad;
      return {
        ...state,
        items: projects,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default projectReducer;
