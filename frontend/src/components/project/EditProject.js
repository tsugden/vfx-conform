import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { updateProject, deleteProject } from "../../actions/projectActions";
import DeleteProject from "./DeleteProject";

const EditProject = ({
  updateProject,
  deleteProject,
  project: { selected },
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", nickname: "" });
  const { name, nickname } = form;

  useEffect(() => {
    if (selected !== null) {
      const { name, nickname } = selected;
      setForm({ name, nickname });
    }
  }, [selected]);

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    updateProject({ ...form, _id: selected._id });
    clearAll();
  };

  const onFormDelete = (e) => {
    deleteProject(selected);
    clearAll();
  };

  const clearAll = () => {
    setOpen(false);
    const { name, nickname } = selected;
    setForm({ name, nickname });
  };

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      trigger={<Dropdown.Item text="Edit Selected..." icon="edit" />}
    >
      <Modal.Header>Edit Project</Modal.Header>

      <Modal.Content>
        <Form onSubmit={onFormSubmit} id="editmodal">
          <Form.Field>
            <label>Name</label>
            <input
              required
              type="text"
              placeholder="Ex. News of the World"
              name="name"
              value={name}
              onChange={onFormChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Nickname</label>
            <input
              required
              type="text"
              placeholder="Ex. NOTW"
              name="nickname"
              value={nickname}
              onChange={onFormChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <DeleteProject onFormDelete={onFormDelete} />
        <Button color="black" content="Cancel" onClick={clearAll} />
        <Button positive content="Submit" type="submit" form="editmodal" />
      </Modal.Actions>
    </Modal>
  );
};

EditProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.object,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, {
  updateProject,
  deleteProject,
})(EditProject);
