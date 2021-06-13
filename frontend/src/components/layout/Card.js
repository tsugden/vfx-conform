// React
import React from "react";

// CSS
import "./Card.css";

const Card = ({ children, className, block, ...rest }) => {
  const classNames = ["card", block && "block", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default Card;
