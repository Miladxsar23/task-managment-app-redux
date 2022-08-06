import ConnectedApp, { App } from "../../../App";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import  thunk  from "redux-thunk";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  test("should render a FlushMessage component if there is an error", () => {
    render(<App error="Ooops!" projects={[]} dispatch={() => {}} />);
    expect(screen.getByText(/Ooops!/)).toBeInTheDocument();
  });
  test("should dispatch fetchProjects on mount", () => {
    const spy = jest.fn();
    render(<App error="Ooops!" projects={[]} dispatch={spy} />);
    expect(spy).toHaveBeenCalled();
  });
  test("should fetch project on mount", () => {
    const middlewares = [thunk]
    const store = configureMockStore(middlewares)({
      projects: {
        items: {},
        isLoading: false,
        error: null,
      },
      tasks: {
        items: {},
        isLoading: false,
        error: null,
      },
      page: {},
    });
    console.log(store)
    render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
    const expectedAction = {
      type: "FETCH_PROJECTS_STARTED",
      payLoad: {boards : undefined},
    };
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
