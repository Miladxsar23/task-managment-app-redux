import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProjects } from "../../reducers/projects";
import { setCurrentProjectId } from "../../actions";
import "./Header.scss";
function Header() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects, shallowEqual);
  const onChangeCurrentProject = (evt) => {
    dispatch(setCurrentProjectId(Number(evt.target.value)));
  };
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
      {console.log("header render")}
      <select className="form-select w-25" onChange={onChangeCurrentProject}>
        {projectsOption}
      </select>
    </div>
  );
}

export default React.memo(Header);
