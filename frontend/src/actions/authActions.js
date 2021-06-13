import axios from "axios";
import conform from "../api/conform";
import setAuthToken from "../utils/setAuthToken";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  SET_AUTH_LOADING,
} from "./types";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });

  try {
    const res = await conform.post("/api/v1/auth/login", formData);
    setAuthToken(res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    setAuthToken();
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    dispatch(clearError());
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/me");

    // TODO: consider changing 'data' property to 'user'
    dispatch({ type: USER_LOADED, payload: res.data.data });
  } catch (err) {
    setAuthToken();
    dispatch({ type: AUTH_ERROR, payload: err.response.data });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
