import React, { Component, useEffect } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import { connect, useSelector, useDispatch } from "react-redux";
import { createTask, editTask, fetchTasks } from "./actions";
import FlashMessage from "./components/FlashMessage/FlashMessage";
class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };
  onEditTask = (id, params) => {
    const task = this.props.tasks.find((t) => t.id === id);
    params = { ...task, ...params };
    this.props.dispatch(editTask(id, params));
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
          onEditTask={this.onEditTask}
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

// const App2 = (props) => {
//   const tasks = useSelector((state) => state.tasks);
//   const dispatch = useDispatch();
//   function onCreate({ title, description }) {
//     dispatch(createTask({ title, description }));
//   }
//   function onEditTask(id, params) {
//     const task = tasks.tasks.find((t) => t.id === id);
//     params = { ...task, ...params };
//     dispatch(editTask(id, params));
//   }
//   useEffect(() => {
//     if (tasks.tasks.length === 0) {
//       dispatch(fetchTasks());
//     }
//   }, []);
//   return (
//     <div className="App">
//       {tasks.error && <FlashMessage message={tasks.error} />}
//       <TaskPage
//         className="p-4"
//         onCreateTask={onCreate}
//         onEditTask={onEditTask}
//       />
//     </div>
//   );
// };
export default connect(mapStateToProps)(App);
// export default App2;
