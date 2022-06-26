import * as api from "../api";
import { normalize } from "normalizr";
import receiveEntities from "./receive-entities";
import { projectSchema } from "../schema";
import { setCurrentProjectId } from "./page";
function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectStarted());
    api
      .fetchProjects()
      .then((resp) => {
        const normalizedData = normalize(resp.data, [projectSchema]);
        dispatch(receiveEntities(normalizedData));
        if (!getState().page.currentProjectId) {
          const defaultProjectId = resp.data[0].id;
          dispatch(setCurrentProjectId(defaultProjectId));
        }
      })
      .catch((err) => {
        dispatch(fetchProjectsFailed(err));
      });
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
