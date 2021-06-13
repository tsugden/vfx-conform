import React from "react";

import "./MenuHeader.css";

const MenuHeader = ({ content, children }) => {
  return <h6 className="menu-header">{content ? content : children}</h6>;
};

export default MenuHeader;
