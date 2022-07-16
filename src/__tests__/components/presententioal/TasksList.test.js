import * as React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import TasksList from "../../../components/TasksList/TasksList";
describe("TasksList", () => {
  test("should render a status", () => {
    render(
      <TasksList filteredTasks={[]} onEditTask={() => {}} title="In Progress" />
    );
    expect(screen.getByText(/In Progress/)).toBeInTheDocument();
  });
  test("snapshot test without tasks", () => {
    const tree = renderer.create(
      <TasksList filteredTasks={[]} onEditTask={() => {}} title="In Progress" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("should render a Task component for each task", () => {
    const mockTasks = [
      {
        id: 1,
        title: "A",
        description: "a",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
      {
        id: 2,
        title: "B",
        description: "b",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
      {
        id: 3,
        title: "C",
        description: "c",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
    ];
    render(
      <TasksList
        filteredTasks={mockTasks}
        onEditTask={() => {}}
        title="Unstarted"
      />
    );
    expect(
      screen.getAllByRole("combobox", { label: "Change status of task" })
    ).toHaveLength(3);
  });
  test("snapshot test with tasks", () => {
    const mockTasks = [
      {
        id: 1,
        title: "A",
        description: "a",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
      {
        id: 2,
        title: "B",
        description: "b",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
      {
        id: 3,
        title: "C",
        description: "c",
        status: "Unstarted",
        timer: 0,
        projectId: 1,
      },
    ];
    const tree = renderer.create(
      <TasksList
        filteredTasks={mockTasks}
        onEditTask={() => {}}
        title="Unstarted"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
