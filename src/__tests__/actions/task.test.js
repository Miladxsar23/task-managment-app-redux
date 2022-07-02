import configureMockStore from "redux-mock-store";
import { createTask } from "../../actions/tasks";
import * as api from "../../api";
import thunk from "redux-thunk";
// mock api module
jest.mock("../../api", () => {
  const originalModule = jest.requireActual("../../api");
  return {
    __esModule: true,
    ...originalModule,
    createTask: (arg) => Promise.resolve({data : "foo"})
  };
});

// configuration mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// suite tests
describe("create task action create store<async>", () => {
  test("works", async () => {
    const expectedActions = [
      { type: "REQUEST_STARTED" },
      {
        type: "CREATE_TASK_SUCCEED",
        payLoad: { task: "foo" },
        meta: { analytics: { event: "create_task", data: { id: undefined } } },
      },
    ];
    const store = mockStore({
      tasks: {
        tasks: [],
      },
    });
    await store.dispatch(createTask({}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
