import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { createProject } from "../../actions/projectActions";

const NewProject = ({ createProject }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", nickname: "" });
  const { name, nickname } = form;

  const onFormSubmit = (e) => {
    e.preventDefault();
    createProject(form);
    clearAll();
  };

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearAll = () => {
    setOpen(false);
    setForm({ name: "", nickname: "" });
  };

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      trigger={<Dropdown.Item text="New Project..." icon="file" />}
    >
      <Modal.Header>New Project</Modal.Header>

      <Modal.Content>
        <Form onSubmit={onFormSubmit} id="newproject">
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
        <Button color="black" content="Cancel" onClick={clearAll} />
        <Button positive content="Submit" type="submit" form="newproject" />
      </Modal.Actions>
    </Modal>
  );
};

NewProject.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default connect(null, { createProject })(NewProject);
