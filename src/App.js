import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import Header from "./components/Header/Header";
import { connect } from "react-redux";
import {
  createTask,
  editTask,
  fetchProjects,
  filterTasks,
  setCurrentProjectId,
} from "./actions";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import { getGroupAndFilteredTasks, getProjects } from "./reducers/projects";
class App extends Component {
  onCreateTask = ({ title, description }) => {
    const { currentProjectId } = this.props;
    this.props.dispatch(
      createTask({ title, description, projectId: currentProjectId })
    );
  };
  onEditTask = (id, status, params) => {
    const tasksByStatus = this.props.tasks[status];
    const task = tasksByStatus.find((t) => t.id === id);
    params = { ...task, ...params };
    this.props.dispatch(editTask(id, params));
  };
  onSearch = (searchterm) => {
    this.props.dispatch(filterTasks(searchterm));
  };
  onChangeCurrentProject = (evt) => {
    this.props.dispatch(setCurrentProjectId(Number(evt.target.value)));
  };
  componentDidMount() {
    console.log(this.props.tasks)
    this.props.dispatch(fetchProjects());
  }
  render() {
    return (
      <div className="App">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <Header
          projects={this.props.projects}
          onChangeCurrentProject={this.onChangeCurrentProject}
        />
        {this.props.tasks ? (
          <TaskPage
            className="p-4"
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onEditTask={this.onEditTask}
            onSearch={this.onSearch}
            isLoading={this.props.isLoading}
          />
        ) : (
          <p className="text-center">please select a project</p>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { error, isLoading } = state.projects;
  console.log(isLoading)
  return {
    tasks: getGroupAndFilteredTasks(state),
    projects: getProjects(state),
    isLoading,
    error,
  };
}

export default connect(mapStateToProps)(App);
