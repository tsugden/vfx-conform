import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewProjectModal from "../newProjectModal";
import { MenuItem, MenuSeparator } from "../menu";
import { Button } from "../form";

import { setSelectedProject } from "../../actions/projectActions";

import "./ProjectSelect.css";

const ProjectSelect = ({ project, setSelectedProject }) => {
  const [show, setShow] = useState(false);

  const onButtonClick = (project) => {
    setSelectedProject(project);
  };

  const { projects } = project;

  const renderedProjects = projects.map((project) => {
    const { _id, name } = project;
    return (
      <MenuItem key={_id} onClick={() => onButtonClick(project)}>
        {name}
      </MenuItem>
    );
  });

  const renderedComponent = (
    <section id="project-select" className="contentz">
      <div className="project-select-container container">
        <div className="project-container">
          {projects.length > 0 && (
            <>
              {renderedProjects}
              <MenuSeparator />
            </>
          )}

          <Button secondary onClick={() => setShow(true)}>
            New Project
          </Button>
        </div>
      </div>

      <NewProjectModal show={show} onClose={() => setShow(false)} />
    </section>
  );
  /*
          <div className="project-btn">
            <h4>
              <i className="fas fa-file-video" /> New Project
            </h4>
          </div>
          */

  return ReactDOM.createPortal(
    renderedComponent,
    document.querySelector("#root")
  );
};

ProjectSelect.propTypes = {
  project: PropTypes.object.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { setSelectedProject })(ProjectSelect);
