import * as React from "react";

const Task = (props) => {
  const { task } = props;
  return (
    <div className="task w-100 d-flex flex-column bg-light p-3 my-2 rounded">
      <div className="task-header d-flex flex-row justify-content-between align-items-center">
        <div className="task-header-title text-primary">
          <strong>{task.title}</strong>
        </div>
        <div className="task-header-status">
          <select
            className="form-select form-select-sm"
            aria-label="Default select example"
            defaultValue={task.status}
            onChange={(evt) => {
              const newStatus = evt.target.options[evt.target.selectedIndex].value
              props.onChangeStatus({id : task.id, newStatus})
            }}
          >
            <option value="Unstarted">Unstarted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
    </div>
  );
};

export default Task;
