import * as React from "react";
import './Header.scss'
const Header = ({ projects, onChangeCurrentProject }) => {
  const projectsOption = projects.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });
  return (
    <div className="Header p-4 d-flex flex-column justify-content-center align-items-center">
      <p className="text-center Header_title">Projects:</p>
      <select className="form-select w-25" onChange={onChangeCurrentProject}>
        {projectsOption}
      </select>
    </div>
  );
};

export default Header;
