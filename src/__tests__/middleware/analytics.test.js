import analytics, { fakeAnalyticsApi } from "../../middleware/analytics";
jest.mock("../../middleware/analytics", () => {
  const orginalModules = jest.requireActual("../../middleware/analytics");
  return {
    __esModule: true,
    ...orginalModules,
    fakeAnalyticsApi: jest.fn().mockImplementation(() => Promise.resolve("success"))
  };
});
const create = () => {
  const store = {
    getState: jest.fn(() => {}),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = (action) => analytics(store)(next)(action);
  return { store, next, invoke };
};
// suite test
describe("analytics middleware", () => {
  test("should pass on irrelevant keys", () => {
    const { next, invoke } = create();
    const action = { type: "IRREVELANT" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(fakeAnalyticsApi).not.toHaveBeenCalled();
  });
  test("should make an analytics API call", () => {
    const { next, invoke } = create();
    const action = {
      type: "REVELANT",
      meta: {
        analytics: {
          event: "REVELANT",
          data: { extra: "stuff" },
        },
      },
    };
    invoke(action);
    expect(fakeAnalyticsApi).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });
});
