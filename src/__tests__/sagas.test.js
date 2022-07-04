import { put, delay, call } from "@redux-saga/core/effects";
import { runSaga } from "redux-saga";
import { handleProgressTimer, fetchTasks } from "../sagas";
import * as api from "../api";
describe("sagas", () => {
  describe("fetchTask", () => {
    // success path
    test("fetchTask succeed path", async () => {
      api.fetchTasks = jest.fn(() => Promise.resolve({ data: "foo" }));
      const dummyTasks = { data: "foo" };
      let dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchTasks
      );
      expect(dispatched[0]).toEqual({ type: "REQUEST_STARTED" });
      setTimeout(() => {
        expect(dispatched[1]).toEqual({
          type: "FETCH_TASKS_SUCCEED",
          payLoad: { tasks: dummyTasks.data },
        });
      }, 2000);
    });
    //failure path
    test("fetchTasks failured path", async () => {
      api.fetchTasks = jest.fn(() => Promise.reject(new Error("failure")));
      const dummyError = new Error("failure");
      let dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchTasks
      );
      expect(dispatched[0]).toEqual({ type: "REQUEST_STARTED" });
      setTimeout(() => {
        expect(dispatched[1]).toEqual({
          type: "REQUEST_FAILED",
          payLoad: { error: dummyError },
        });
      }, 2000);
    });
  });
  describe("handleProgressTimer", () => {
    it("handles the handleProgressTimer happy path", () => {
      const iterator = handleProgressTimer({
        type: "TIMER_STARTED",
        payLoad: { taskId: 12 },
      });
      const expectedAction = {
        type: "TIMER_INCREAMENT",
        payLoad: { taskId: 12 },
      };
      expect(iterator.next().value).toEqual(delay(1000));
      expect(iterator.next().value).toEqual(put(expectedAction));
      expect(iterator.next().value).toEqual(delay(1000));
      expect(iterator.next().value).toEqual(put(expectedAction));
      expect(iterator.next().done).toBe(false);
    });
    it("handle the handleProhressTimer sad path", () => {
      const iterator = handleProgressTimer({
        type: "TIMER_STOPEED",
      });
      expect(iterator.next().done).toBe(true);
    });
  });
});
