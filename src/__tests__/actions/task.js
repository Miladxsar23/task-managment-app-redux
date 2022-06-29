import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as api from "../../api";
import { createTask, createTaskSucceed } from "../../actions/tasks";
// cofigurate redux mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// mock api calls
jest.unmock("../../api");
api.createTask = jest.fn(
  () => {return new Promise((resolve, reject) => resolve({ data: "foo" }))}
);
// test suits
describe("task action creators", () => {
  describe("createTask", () => {
    test("works", () => {
      const expectedActions = [
        { type: "REQUEST_STARTED" },
        { type: "CREATE_TASK_SUCCEED", payLoad: { task: "foo" } },
      ];
      const store = mockStore({
        tasks: {
          tasks: [],
        },
      });
      return store.dispatch(createTask({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(api.createTask).toHaveBeenCalled();
      });
    });
  });
});
