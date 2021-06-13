import React from "react";

import "./NavButton.css";

const NavButton = ({
  content,
  children,
  onClick,
  selected = false,
  disabled,
  big,
  ...rest
}) => {
  const classNames = [
    "nav-button",
    `${selected ? "selected" : ""}`,
    `${big ? "big" : ""}`,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <button
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      {...rest}
    >
      {content ? content : children}
    </button>
  );
};

export default NavButton;
