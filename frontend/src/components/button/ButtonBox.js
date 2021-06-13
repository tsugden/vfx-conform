import React from "react";

import "./ButtonBox.css";

const ButtonBox = ({ left, right, className, children, ...rest }) => {
  const classNames = [`button-box ${left ? "left" : "right"}`, className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default ButtonBox;
