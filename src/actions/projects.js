import * as api from "../api";
function fetchProjects() {
  return (dispatch) => {
    dispatch(fetchProjectStarted());
    api
      .fetchProjects()
      .then((resp) => {
        dispatch(fetchProjectsSucceed(resp.data));
      })
      .catch((err) => {
        dispatch(fetchProjectsFailed(err));
      });
  };
}
function fetchProjectsSucceed(projects) {
  return {
    type: "PROJECTS_FETCH_SUCCEED",
    payLoad: { projects: projects },
  };
}
function fetchProjectStarted(boards) {
  return {
    type: "FETCH_PROJECTS_STARTED",
    payLoad: { boards },
  };
}
function fetchProjectsFailed(err) {
  return {
    type: "FETCH_PROJECTS_FAILED",
    payLoad: { error: err },
  };
}

export { fetchProjects };
