// React
import React from "react";

// CSS
import "./Layout.css";

export const GridContainer = ({ children, className, ...rest }) => {
  const classNames = ["grid-container", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const GridHeader = ({ children, className, ...rest }) => {
  const classNames = ["grid-header", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const GridBody = ({ children, className, ...rest }) => {
  const classNames = ["grid-body", className].filter(Boolean).join(" ").trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const GridContent = ({ children, className, ...rest }) => {
  const classNames = ["grid-content", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};
