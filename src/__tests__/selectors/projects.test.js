import {
  getProjects,
  getTaskByProjectId,
  getFilteredTasks,
  getGroupAndFilteredTasks,
} from "../../reducers/projects";
import { cloneDeep, get } from "lodash";

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
        0: { id: 0, title: "test Selector", status: "Unstarted", projectId: 0 },
        1: { id: 1, title: "redux react",status: "In Progress", projectId: 0 },
        2: { id: 2, title: "reselectors",status:"Completed", projectId: 1 },
        3: { id: 3, title: "memoizing",status: "Unstarted", projectId: 1 },
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
      { id: 0, title: "test Selector", status: "Unstarted", projectId: 0 },
      { id: 1, title: "redux react",status: "In Progress", projectId: 0 },
    ];
    expect(getTaskByProjectId(state)).toEqual(expectedValue);
  });
  test("should return tasks from getFilteredTasks selector", () => {
    const expectedTasks = [
      { id: 1, title: "redux react",status: "In Progress", projectId: 0 },
    ];
    expect(getFilteredTasks(state)).toEqual(expectedTasks);
  });
  test("should minimally recompute the state when getFilteredTasks is called", () => {
    const similarSearch = cloneDeep(state)
    similarSearch.page.taskSearchTerm = "re"
    const uniqueSearch = cloneDeep(state)
    uniqueSearch.page.taskSearchTerm = "sele"
    expect(getFilteredTasks.recomputations()).toEqual(0)
    getFilteredTasks(state)
    getFilteredTasks(similarSearch)
    expect(getFilteredTasks.recomputations()).toEqual(1)
    getFilteredTasks(uniqueSearch)
    expect(getFilteredTasks.recomputations()).toEqual(2)
  })
  test("should return grouped tasks from getGroupAndFilteredTasks selector", () => {
   const expectedValue = {
    "Unstarted" : [], 
    "In Progress" : [{ id: 1, title: "redux react",status: "In Progress", projectId: 0 }], 
    "Completed" : []
   }
   console.log(getGroupAndFilteredTasks(state))
   expect(getGroupAndFilteredTasks(state)).toEqual(expectedValue)
  })
});
