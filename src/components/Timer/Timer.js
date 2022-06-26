import * as React from "react";
import './Timer.scss'
const Timer = ({ time }) => {
  return (
    <div className="Timer">
      <small>{time}s</small>
    </div>
  );
};
export default Timer;
