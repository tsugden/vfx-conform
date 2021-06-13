import React from "react";

const NavbarMenu = ({ children, position = "right" }) => {
  return <nav className={`navbar-menu ${position}`}>{children}</nav>;
};

export default NavbarMenu;
