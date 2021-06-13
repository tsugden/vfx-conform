import React from "react";

import "./Button.css";

const Button = ({
  children,
  content,
  block,
  className,
  secondary,
  menu,
  ...rest
}) => {
  const classNames = [
    "btn",
    secondary && "secondary",
    block && "btn-block",
    menu && "menu",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <button className={classNames} {...rest}>
      {content ? content : children}
    </button>
  );
};

export default Button;
