import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownItem } from "semantic-ui-react";

const FsDropdown = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  return (
    <Dropdown
      item
      open={open}
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
      text="Filesystem"
    >
      <Dropdown.Menu>
        <DropdownItem text="Index" onClick={() => history.push("/indexfs")} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FsDropdown;
