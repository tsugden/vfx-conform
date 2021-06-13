import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
  DropdownHeader,
} from "semantic-ui-react";

import {
  getProjects,
  setSelectedProject,
  clearSelectedProject,
} from "../../actions/projectActions";
import NewProject from "./NewProject";
import EditProject from "./EditProject";

const ProjectDropdown = ({
  getProjects,
  setSelectedProject,
  clearSelectedProject,
  project,
}) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const ref = useRef();
  const { projects, selected } = project;

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onDropdownClick = (e) => {
    if (ref.current.contains(e.target)) {
      setOpen(!open);
    }
  };

  const onClearProjectClick = () => {
    clearSelectedProject();
    history.push("/");
  };

  const renderedProjects = projects.map((project) => {
    const { _id, name } = project;

    if (selected !== null && selected._id === _id) {
      return null;
    }
    return (
      <DropdownItem
        key={_id}
        text={name}
        onClick={() => setSelectedProject(project)}
      />
    );
  });

  return (
    <div ref={ref}>
      <Dropdown
        item
        open={open}
        onClick={onDropdownClick}
        onBlur={() => setOpen(false)}
        text={selected !== null ? selected.name : "Select Project"}
      >
        <Dropdown.Menu>
          {projects.length > 0 && (
            <Fragment>
              <DropdownHeader content="Projects" />
              {renderedProjects}
              <DropdownDivider />
            </Fragment>
          )}

          {selected !== null && (
            <Fragment>
              <DropdownItem
                text="Close Selected..."
                icon="close"
                onClick={onClearProjectClick}
              />
              <EditProject />
              <DropdownDivider />
            </Fragment>
          )}

          <NewProject />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

ProjectDropdown.propTypes = {
  getProjects: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  clearSelectedProject: PropTypes.func.isRequired,
  project: PropTypes.object,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, {
  getProjects,
  setSelectedProject,
  clearSelectedProject,
})(ProjectDropdown);
