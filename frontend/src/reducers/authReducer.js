import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  SET_AUTH_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        ...INITIAL_STATE,
        error: payload.error,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default authReducer;
