import * as React from "react";
import { useState, useEffect } from "react";
import TasksList from "../TasksList/TasksList";
import "./TaskPage.scss";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
const TASK_STATUS = ["Unstarted", "In Progress", "Completed"];
const TasksPage2 = ({ onCreateTask, onEditTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState({ title: "", description: "" });
  const isLoading = useSelector((state) => state.tasks.isLoading);
  function handleTitleChange(evt) {
    setFields({
      title: evt.target.value,
    });
  }
  function handleDescriptionChange(evt) {
    setFields({
      description: evt.target.description,
    });
  }
  function handleResetForm() {
    setFields({
      title: "",
      description: "",
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onCreateTask(fields);
    handleResetForm()
  }
  function toggleForm() {
    setShowForm(!showForm);
  }
  function handleCancel() {
    toggleForm();
  }
  function renderAddButton() {
    return (
      <div className="col-sm-12 col-md-3">
        <button
          type="button"
          className="btn btn-outline-secondary d-block m-auto w-100"
          onClick={toggleForm}
        >
          + New Task
        </button>
      </div>
    );
  }
  function renderTaskForm() {
    return (
      <div className="col-sm-12 col-md-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={fields.title}
              placeholder="title of task..."
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={fields.description}
              placeholder="description of task..."
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="d-flex p-2">
            <button
              type="button"
              className="btn btn-outline-secondary mx-2 w-50"
              onClick={toggleForm}
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
  }
  function renderTaskLists() {
    return TASK_STATUS.map((status) => {
      return (
        <TasksList
          key={uuidv4()}
          title={status}
          onEditTask={onEditTask}
        />
      );
    });
  }

  if (isLoading) {
    return (
      <div className="loading">
        <span className="loading-indicator"></span>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row p-4">
          {renderTaskLists()}
          {showForm ? renderTaskForm() : renderAddButton()}
        </div>
      </div>
    );
  }
};

export default TasksPage2
