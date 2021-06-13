// React
import { useReducer } from "react";

// Types
const ON_INIT = "ON_INIT";
const ON_CHANGE = "ON_CHANGE";
const ON_CANCEL = "ON_CANCEL";

const editReducer = (state, { type, payload }) => {
  switch (type) {
    case ON_INIT:
      return {
        ...state,
        value: payload,
        snapshot: payload,
      };

    case ON_CHANGE:
      return {
        ...state,
        value: payload,
      };

    case ON_CANCEL:
      return {
        ...state,
        value: state.snapshot,
      };

    default:
      throw new Error(`Unhandled Type: ${type}`);
  }
};

const useInputMemory = (initialValue) => {
  const [{ value, snapshot }, dispatch] = useReducer(editReducer, {
    value: initialValue,
    snapshot: initialValue,
  });

  const onInit = (value) => dispatch({ type: ON_INIT, payload: value });
  const onChange = (value) => dispatch({ type: ON_CHANGE, payload: value });
  const onCancel = () => dispatch({ type: ON_CANCEL });

  return [value, snapshot, onInit, onChange, onCancel];
};

export default useInputMemory;
