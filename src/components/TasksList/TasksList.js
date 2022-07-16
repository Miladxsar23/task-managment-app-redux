import * as React from "react";
import "./TasksList.scss";
import Task from "../Task/Task";
const TasksList = ({ filteredTasks, onEditTask, title }) => {
  const rows = filteredTasks.map((task) => {
    return <Task key={task.id} task={task} onEditTask={onEditTask} />;
  });
  return (
    <div className="tasks col-sm-12 col-md-3">
      <div className="tasks-list">
        <div className="tasks-list-title">
          <h4>{title}</h4>
        </div>
        <hr />
        <div className="tasks-lists-item d-flex flex-column justify-content-start align-items-center my-2">
          {rows}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
