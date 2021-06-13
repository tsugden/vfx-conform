import React from "react";

import "./ModalHeader.css";

const ModalHeader = ({ content, children }) => {
  return (
    <div className="modal-header">
      <h3>{content ? content : children}</h3>
    </div>
  );
};

export default ModalHeader;
