import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Confirm } from "semantic-ui-react";

import "./DeleteProject.css";

const DeleteProject = ({ onDelete }) => {
  const [open, setOpen] = useState(false);

  const onModalConfirm = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        className="delete-project-btn"
        content="Delete Project"
        color="red"
        onClick={() => setOpen(true)}
      />
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={onModalConfirm}
      />
    </Fragment>
  );
};

DeleteProject.propTypes = {
  onFormDelete: PropTypes.func.isRequired,
};

export default DeleteProject;
