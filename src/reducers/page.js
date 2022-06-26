const initialState = {
  currentProjectId: null,
  taskSearchTerm: "",
};

function page(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return {
        ...state,
        currentProjectId: action.payLoad.id,
      };
    }
    case "FILTER_TASKS": {
      return {
        ...state,
        taskSearchTerm: action.payLoad.searchTerm,
      };
    }
    default:
      return state;
  }
}
// input selector :
const getPage = (state) => state.page;
const getCurrentProjectId = (state) => state.page.currentProjectId;
const getTaskSearchTerm = (state) => state.page.taskSearchTerm;
export default page;
export { getCurrentProjectId, getPage, getTaskSearchTerm };
