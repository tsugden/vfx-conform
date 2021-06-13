// React
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Navbar from "./Navbar";
import NavbarItem from "./NavbarItem";
import LogoutItem from "./LogoutItem";
import Hamburger from "./Hamburger";
import useAlert from "../hooks/useAlert";
import ProjectSelect from "../projectSelect";

// Actions
import {
  getProjects,
  clearSelectedProject,
} from "../../actions/projectActions";
import { clearWatchDirs } from "../../actions/dirActions";

// CSS
import "./Header.css";

const Header = ({
  project,
  alert,
  getProjects,
  clearSelectedProject,
  clearWatchDirs,
}) => {
  const message = useAlert(alert);
  const { projects, selected } = project;
  const title = selected ? selected.name.toUpperCase() : "CONFORMZ";

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onButtonClose = () => {
    clearWatchDirs();
    clearSelectedProject();
  };

  return (
    <header id="header">
      <div className="header-container wrapper">
        <div className="status-container">
          <h4>{message ? message : title}</h4>
        </div>

        <Navbar position="left">
          <Hamburger />
        </Navbar>

        <Navbar position="right">
          <NavbarItem
            content={<i className="fas fa-info-circle" />}
            onClick={() => console.log("info")}
          />
          <NavbarItem
            content={<i className="fas fa-times-circle" />}
            enabled={selected !== null}
            onClick={onButtonClose}
          />
          <LogoutItem />
        </Navbar>
      </div>

      {projects !== undefined && selected === null && <ProjectSelect />}
    </header>
  );
};

Header.propTypes = {
  project: PropTypes.object.isRequired,
  alert: PropTypes.string,
  getProjects: PropTypes.func.isRequired,
  clearSelectedProject: PropTypes.func.isRequired,
  clearWatchDirs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  alert: state.alert,
});

export default connect(mapStateToProps, {
  getProjects,
  clearSelectedProject,
  clearWatchDirs,
})(Header);
