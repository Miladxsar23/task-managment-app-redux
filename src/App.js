import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import { connect } from "react-redux";
class App extends Component {
  onCreateTask = (newTask) => {
    const action = { type: "CREATE_TASK", payLoad: { newTask } };
    this.props.dispatch(action);
  };
  render() {
    return (
      <div className="App p-4">
        <TaskPage tasks={this.props.tasks} onCreateTask={this.onCreateTask} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}
export default connect(mapStateToProps)(App);
