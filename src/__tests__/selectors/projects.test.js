import {
  getProjects,
  getTaskByProjectId,
  getFilteredTasks,
  getGroupAndFilteredTasks,
} from "../../reducers/projects";
import { cloneDeep } from "lodash";

describe("project selectors", () => {
  const state = {
    projects: {
      isLoading: false,
      error: null,
      items: {
        0: { id: 0, title: "project1", tasks: [0, 1] },
        1: { id: 1, title: "project2", tasks: [2, 3] },
      },
    },
    tasks: {
      isLoading: false,
      error: null,
      items: {
        0: { id: 0, title: "test Selector", projectId: 0 },
        1: { id: 1, title: "redux react", projectId: 0 },
        2: { id: 2, title: "reselectors", projectId: 1 },
        3: { id: 3, title: "memoizing", projectId: 1 },
      },
    },
    page: {
      currentProjectId: "0",
      taskSearchTerm: "re",
    },
  };
  //reset all computation memoized value from reselector functions
  afterEach(() => {
    getFilteredTasks.resetRecomputations();
    getGroupAndFilteredTasks.resetRecomputations();
  });
  test("should retrieve projects from the getProjects selector", () => {
    const expectedValue = [
      { id: 0, title: "project1", tasks: [0, 1] },
      { id: 1, title: "project2", tasks: [2, 3] },
    ];
    expect(getProjects(state)).toEqual(expectedValue);
  });
  test("should retrieve tasks from getTaskByProjectId selector", () => {
    const expectedValue = [
      { id: 0, title: "test Selector", projectId: 0 },
      { id: 1, title: "redux react", projectId: 0 },
    ];
    expect(getTaskByProjectId(state)).toEqual(expectedValue);
  });
});
