import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./Task.scss";
import Timer from "../Timer/Timer";
const TASK_STATUS = ["Unstarted", "In Progress", "Completed"];
function Task(props) {
  console.log(props.taskId)
  const task = useSelector(
    (state) => state.tasks.items[props.taskId],
    shallowEqual
  );
  function onStatusChange(evt) {
    const newStatus = evt.target.value;
    props.onEditTask(task.id, { status: newStatus });
  }
  const options = TASK_STATUS.map((status) => {
    return (
      <option key={status} value={status}>
        {status}
      </option>
    );
  });
  return (
    <div className="task w-100 d-flex flex-column p-3 my-2 rounded">
      <div className="task-header d-flex flex-row justify-content-between align-items-center">
        <div className="task-header-title text-primary">
          <strong className="title">{task.title}</strong>
        </div>
        <div className="task-header-status">
          <select
            className="form-select form-select-sm"
            aria-label="Change status of task"
            value={task.status}
            onChange={onStatusChange}
          >
            {options}
          </select>
        </div>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
      <div className="task-footer">
        <Timer time={task.timer} />
      </div>
    </div>
  );
}

export default React.memo(Task);
