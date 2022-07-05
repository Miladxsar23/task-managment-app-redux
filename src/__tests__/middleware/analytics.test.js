import analytics from "../../middleware/analytics";
import * as helpers from "../../helpers";
jest.mock("../../helpers");
const create = () => {
  const store = {
    getState: jest.fn(() => {}),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = (action) => analytics(store)(next)(action);
  return { invoke, store, next };
};

describe("analytics middleware", () => {
  beforeEach(() => {
    helpers.fakeAnalyticsApi.mockResolvedValue("success");
  });
  test("should pass on irrelevant keys", () => {
    const action = {
      type: "IRREVELANT",
    };
    const { invoke, next } = create();
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(helpers.fakeAnalyticsApi).not.toHaveBeenCalled();
  });
  test("should pass revelant keys", async () => {
    const action = {
      type: "REVELANT",
      meta: {
        analytics: {
          event: "foo",
          data: { extra: "stuff" },
        },
      },
    };
    const { invoke, next } = create();
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(helpers.fakeAnalyticsApi).toHaveBeenCalled();
  });
});
