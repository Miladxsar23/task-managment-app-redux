import * as React from "react";
import { v4 as uuid } from "uuid";
import './Task.scss'
import Timer from "../Timer/Timer";
const TASK_STATUS = ["Unstarted", "In Progress", "Completed"];
const Task = (props) => {
  const { task } = props;
  const options = TASK_STATUS.map((status) => {
    return (
      <option key={uuid()} value={status}>
        {status}
      </option>
    );
  });
  return (
    <div className="task w-100 d-flex flex-column p-3 my-2 rounded">
      <div className="task-header d-flex flex-row justify-content-between align-items-center">
        <div className="task-header-title text-primary">
          <strong>{task.title}</strong>
        </div>
        <div className="task-header-status">
          <select
            className="form-select form-select-sm"
            aria-label="Default select example"
            value={task.status}
            onChange={(evt) => {
              const newStatus =
                evt.target.options[evt.target.selectedIndex].value;
              props.onEditTask(task.id, task.status, { status: newStatus });
            }}
          >
            {options}
          </select>
        </div>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
      <div className="task-footer">
        <Timer time={task.timer}/>
      </div>
    </div>
  );
};

export default React.memo(Task);
