import { useState } from "react";
import { Modal, Menu, Button } from "semantic-ui-react";

const About = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      trigger={<Menu.Item content="About" />}
    >
      <Modal.Header>About</Modal.Header>

      <Modal.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
        veritatis nam! Maiores amet voluptates eaque soluta alias. Quo ipsa odit
        fuga necessitatibus adipisci deserunt quae dolore est quaerat, illum id?
      </Modal.Content>

      <Modal.Actions>
        <Button color="black" content="Cancel" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
};
export default About;
