import { App } from "../../../App";
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
});
