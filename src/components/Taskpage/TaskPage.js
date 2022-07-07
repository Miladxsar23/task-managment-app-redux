import React, { Component } from "react";
import TasksList from "../TasksList/TasksList";
import "./TaskPage.scss";
class TaskPage extends Component {
  state = {
    showForm: false,
    fields: {
      title: "",
      description: "",
    },
  };

  handleTitleChange = (evt) => {
    this.setState({
      fields: Object.assign({}, this.state.fields, { title: evt.target.value }),
    });
  };
  handleDescriptionChange = (evt) => {
    const description = evt.target.value;
    this.setState({
      fields: Object.assign({}, this.state.fields, { description }),
    });
  };
  handleResetForm = () => {
    this.setState({
      fields: {
        title: "",
        description: "",
      },
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { fields } = this.state;
    this.props.onCreateTask(fields);
    this.handleResetForm();
  };
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };
  handleCancel = () => {
    this.toggleForm();
  };
  onSearch = (evt) => {
    this.props.onSearch(evt.target.value);
  };
  renderAddButton = () => {
    return (
      <div className="col-sm-12 col-md-3">
        <button
          type="button"
          className="btn btn-outline-secondary d-block m-auto w-100"
          onClick={this.toggleForm}
        >
          + New Task
        </button>
      </div>
    );
  };

  renderTaskForm = () => {
    return (
      <div className="col-sm-12 col-md-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.fields.title}
              placeholder="title of task..."
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.fields.description}
              placeholder="description of task..."
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="d-flex p-2">
            <button
              type="button"
              className="btn btn-outline-secondary mx-2 w-50"
              onClick={this.toggleForm}
            >
              cancel
            </button>
            <button type="submit" className="btn btn-outline-success mx-2 w-50">
              addTask
            </button>
          </div>
        </form>
      </div>
    );
  };
  renderTaskLists = () => {
    const tasks = this.props.tasks;
    return Object.keys(tasks).map((status) => {
      const taskByStatus = tasks[status];
      return (
        <TasksList
          key={status}
          title={status}
          filteredTasks={taskByStatus}
          onEditTask={this.props.onEditTask}
        />
      );
    });
  };
  render() {
    if (this.props.isLoading) {
      return (
        <div className="loading">
          <span className="loading-indicator"></span>
        </div>
      );
    } else {
      return (
        <div className="container border rounded bg-white">
          <div className="d-flex justify-content-center p-4 mt-5">
            <div className="col-md-6 col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={this.onSearch}
              />
            </div>
          </div>
          <div className="row p-4">
            {this.renderTaskLists()}
            {this.state.showForm
              ? this.renderTaskForm()
              : this.renderAddButton()}
          </div>
        </div>
      );
    }
  }
}
export default TaskPage;