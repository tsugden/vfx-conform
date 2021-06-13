import React, { useState } from "react";
import { Confirm } from "../modal";
import { Button } from "../form";

import "./deleteProjectModal.css";

const DeleteProjectModal = ({ onDelete, name }) => {
  const [show, setShow] = useState(false);

  const onModalConfirm = () => {
    onDelete();
    setShow(false);
  };

  return (
    <>
      <Button
        secondary
        content="Delete Projectz"
        onClick={() => setShow(true)}
      />
      <Confirm
        show={show}
        content={`Are you sure you want to delete...`}
        onCancel={() => setShow(false)}
        onConfirm={onModalConfirm}
      />
    </>
  );
};

export default DeleteProjectModal;
