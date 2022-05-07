import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import { connect } from "react-redux";
import { createTask, changeStatus, fetchTasks } from "./actions";
import FlashMessage from "./components/FlashMessage/FlashMessage";
class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };
  onChangeStatus = (id, params) => {
    this.props.dispatch(changeStatus(id, params));
  };
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }
  render() {
    return (
      
      <div className="App">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <TaskPage
          className="p-4"
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onChangeStatus={this.onChangeStatus}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return {
    tasks,
    isLoading,
    error,
  };
}
export default connect(mapStateToProps)(App);
