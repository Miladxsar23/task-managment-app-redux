import { put, delay } from "redux-saga/effects";
import { handleProgressTimer } from "../sagas";

describe("sagas", () => {
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
