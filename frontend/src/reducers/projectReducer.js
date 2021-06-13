import {
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_SELECTED_PROJECT,
  CLEAR_SELECTED_PROJECT,
  SET_PROJECT_ERROR,
  CLEAR_PROJECT_ERROR,
  SET_PROJECT_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  selected: null,
  error: null,
  loading: false,
};

const projectReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };

    case CREATE_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects]
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name)),
        loading: false,
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === payload._id ? payload : project
        ),
        selected: payload,
        loading: false,
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== payload),
        selected: null,
        loading: false,
      };

    case SET_SELECTED_PROJECT:
      return {
        ...state,
        selected: payload,
      };

    case CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selected: null,
      };

    case SET_PROJECT_ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_PROJECT_ERROR:
      return {
        ...state,
        error: null,
      };

    case SET_PROJECT_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default projectReducer;
