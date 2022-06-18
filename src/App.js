import React, { Component } from "react";
import TaskPage from "./components/Taskpage/TaskPage";
import { connect } from "react-redux";
import { createTask, editTask, fetchProjects, filterTasks } from "./actions";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import { getFilteredSpliteTasks } from "./reducers";
class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
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
  componentDidMount() {
    this.props.dispatch(fetchProjects());
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
          onSearch={this.onSearch}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isLoading, error } = state.tasks;
  return {
    tasks: getFilteredSpliteTasks(state),
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
