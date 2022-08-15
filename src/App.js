import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import Header from "./components/Header/Header";
import { connect } from "react-redux";
import { fetchProjects } from "./actions";
import FlashMessage from "./components/FlashMessage/FlashMessage";
export class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }
  render() {
    return (
      <div className="App">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <Header />
        <TaskPage className="p-4" />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { error } = state.projects;
  return {
    error,
  };
}

export default connect(mapStateToProps)(App);
