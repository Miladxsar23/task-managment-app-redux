import * as React from "react";

const Task = (props) => {
  const { task } = props;
  return (
    <div className="task w-100 d-flex flex-column bg-light p-3 my-2 rounded">
      <div className="task-header d-flex flex-row justify-content-space-between align-items-center">
        <div className="task-header-title text-primary">
            <strong>{task.title}</strong>
        </div>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
    </div>
  );
};

export default Task;
