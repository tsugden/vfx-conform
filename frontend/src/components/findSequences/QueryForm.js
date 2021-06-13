// React
import React from "react";

// Components
import { Form, Button, Input, Label } from "../form";
import { Spinner } from "../spinner";
import { Card } from "../layout";

const QueryForm = ({ onSubmit, onClear, term, setTerm, loading }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Label htmlFor="search-term">Name</Label>
      <Input
        id="search-term"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        required
      />
      <Button type="submit">{loading ? <Spinner /> : "Query"}</Button>
      <Button secondary type="button" onClick={onClear}>
        Clear
      </Button>
    </Form>
  );
};

export default QueryForm;
