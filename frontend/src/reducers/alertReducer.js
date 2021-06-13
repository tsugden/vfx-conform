import { SET_ALERT, CLEAR_ALERT } from "../actions/types";

const alertReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return payload;

    case CLEAR_ALERT:
      return null;

    default:
      return state;
  }
};

export default alertReducer;
