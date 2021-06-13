import React from "react";
import PropTypes from "prop-types";

import "./NavbarItem.css";

const NavbarItem = ({ content, onClick, enabled = true }) => {
  return (
    <button disabled={!enabled} className="navbar-menu-item" onClick={onClick}>
      {content}
    </button>
  );
};

NavbarItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NavbarItem;
