import {
  GET_WATCH_DIRS,
  CREATE_WATCH_DIR,
  UPDATE_WATCH_DIRS,
  DELETE_WATCH_DIR,
  SET_WATCH_DIRS_LOADING,
  SET_WATCH_DIRS_ERROR,
  CLEAR_WATCH_DIRS,
} from "../actions/types";

const INITIAL_STATE = {
  dirs: [],
  error: null,
  loading: false,
};

const dirReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_WATCH_DIRS:
      return {
        ...state,
        dirs: payload,
        loading: false,
      };

    case CREATE_WATCH_DIR:
      return {
        ...state,
        dirs: [payload, ...state.dirs],
        loading: false,
      };

    case UPDATE_WATCH_DIRS:
      return {
        ...state,
        dirs: state.dirs.map((dir) =>
          dir._id === payload._id ? payload : dir
        ),
        loading: false,
      };

    case DELETE_WATCH_DIR:
      return {
        ...state,
        dirs: state.dirs.filter((dir) => dir._id !== payload),
        loading: false,
      };

    case SET_WATCH_DIRS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_WATCH_DIRS_ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_WATCH_DIRS:
      return {
        ...state,
        dirs: [],
      };

    default:
      return state;
  }
};

export default dirReducer;
