import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import { connect } from "react-redux";
import { createTask, changeStatus } from "./actions";
class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };
  onChangeStatus = ({id, newStatus}) => {
    this.props.dispatch(changeStatus({id, newStatus}))
  }
  render() {
    return (
      <div className="App p-4">
        <TaskPage tasks={this.props.tasks} onCreateTask={this.onCreateTask} onChangeStatus={this.onChangeStatus}/>
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
