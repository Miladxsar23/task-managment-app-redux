import tasks from "../../reducers/tasks";
describe("the tasks reducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    items: {},
  };
  test("should return the initialState", () => {
    expect(tasks(initialState, {})).toEqual(initialState);
  });
  test("should handle the REQUEST_STARTED action", () => {
    const action = { type: "REQUEST_STARTED" };
    const expectedState = { ...initialState, isLoading: true };
    expect(tasks(initialState, action)).toEqual(expectedState);
  });
  test("should handle the REQUEST_FAILED action", () => {
    const action = {
      type: "REQUEST_FAILED",
      payLoad: { error: { message: "foo" } },
    };
    const expectedState = { ...initialState, isLoading: false, error: "foo" };
    expect(tasks(initialState, action)).toEqual(expectedState);
  });
  test("should handle the RECEIVE_ENTITIES action", () => {
    const action = {
      type: "RECEIVE_ENTITIES",
      payLoad: { entities: { tasks: { 0: "foo" } } },
    };
    const expectedState = { ...initialState, items: { 0: "foo" } };
    expect(tasks(initialState, action)).toEqual(expectedState);
  });
  test("should handle the TIMER_INCREAMENT action", () => {
    const action = { type: "TIMER_INCREAMENT", payLoad: { taskId: 12 } };
    const currentInitialState = {
      ...initialState,
      items: { 12: { id: 12, timer: 129 } },
    };
    const expectedState = {
      ...currentInitialState,
      isLoading: false,
      items: {
        12: { id: 12, timer: 130 },
      },
    };
    expect(tasks(currentInitialState, action)).toEqual(expectedState);
  });
  test("should handle the CHANGE_STATUS_SUCCEED action", () => {
    const currentInitialState = {
      ...initialState,
      items: { 12: { id: 12, status: "In Progress" } },
    };
    const action = {
      type: "CHANGE_STATUS_SUCCEED",
      payLoad: { task: { id: 12, status: "Completed" } },
    };
    const expectedState = {
      ...currentInitialState,
      items: {
        12: { id: 12, status: "Completed" },
      },
    };
    expect(tasks(currentInitialState, action)).toEqual(expectedState);
  });
  test("should handle the CREATE_TASK_SUCCEED action", () => {
    const currentInitialState = {
      ...initialState,
      items: { 0: { id: 0, title: "foo" } },
    };
    const action = {
      type: "CREATE_TASK_SUCCEED",
      payLoad: { task: { id: 1, title: "new task" } },
    };
    const expectedState = {
      ...currentInitialState,
      isLoading: false,
      items: { 0: { id: 0, title: "foo" }, 1: { id: 1, title: "new task" } },
    };
    expect(tasks(currentInitialState, action)).toEqual(expectedState);
  });
});
