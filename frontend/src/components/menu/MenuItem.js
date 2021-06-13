import React from "react";
import { Link } from "react-router-dom";

import "./MenuItem.css";

const MenuItem = ({ content, to, onClick, children }) => {
  return (
    <Link className="menu-item" to={to} onClick={onClick}>
      {content ? content : children}
    </Link>
  );
};
export default MenuItem;
