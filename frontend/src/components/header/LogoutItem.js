import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavbarItem from "./NavbarItem";

import { logout } from "../../actions/authActions";
import { clearSelectedProject } from "../../actions/projectActions";

const Logout = ({ logout, clearSelectedProject }) => {
  const icon = <i className="fas fa-sign-out-alt" />;

  const tearDown = () => {
    logout();
    clearSelectedProject();
  };

  return <NavbarItem content={icon} onClick={tearDown} />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  clearSelectedProject: PropTypes.func.isRequired,
};

export default connect(null, { logout, clearSelectedProject })(Logout);
