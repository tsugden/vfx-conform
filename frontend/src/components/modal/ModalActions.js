import React from "react";

import "./ModalActions.css";

const ModalActions = ({ position = "right", children }) => {
  return (
    <div className={`modal-actions ${position}`}>
      <div className="modal-actions-container">{children}</div>
    </div>
  );
};

export default ModalActions;
