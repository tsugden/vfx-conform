// React
import React from "react";

// Components
import { Form, Button, Input, Label } from "../form";
import { Card } from "../layout";

const SelectForm = ({
  onSubmit,
  onClear,
  onInvert,
  onMerge,
  term,
  setTerm,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Label htmlFor="select-term">Name</Label>
      <Input
        id="select-term"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        required
      />
      <Button type="submit">Select</Button>

      <Button type="button" onClick={onMerge}>
        Merge
      </Button>
      <Button secondary type="button" onClick={onClear}>
        Clear
      </Button>
      <Button secondary type="button" onClick={onInvert}>
        Invert
      </Button>
    </Form>
  );
};

export default SelectForm;
