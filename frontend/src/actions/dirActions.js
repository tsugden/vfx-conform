import conform from "../api/conform";
import {
  GET_WATCH_DIRS,
  CREATE_WATCH_DIR,
  UPDATE_WATCH_DIRS,
  DELETE_WATCH_DIR,
  SET_WATCH_DIRS_LOADING,
  SET_WATCH_DIRS_ERROR,
  CLEAR_WATCH_DIRS,
  SET_ALERT,
  CLEAR_ALERT,
} from "./types";

export const getWatchDirs = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: SET_WATCH_DIRS_LOADING });

    const { data } = await conform.get(`/api/v1/project/${projectId}/watch`);

    dispatch({ type: GET_WATCH_DIRS, payload: data.directories });
  } catch (err) {
    dispatch({ type: SET_WATCH_DIRS_ERROR, payload: err.response.data });
  }
};

export const createWatchDir = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_WATCH_DIRS_LOADING });

    const { projectId } = formData;
    const { data } = await conform.post(
      `/api/v1/project/${projectId}/watch`,
      formData
    );

    dispatch({ type: CREATE_WATCH_DIR, payload: data.directory });
    dispatch(setAlert(`${data.directory.path} added`));
  } catch (err) {
    dispatch({ type: SET_WATCH_DIRS_ERROR, payload: err.response.data });
  }
};

export const updateWatchDir = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_WATCH_DIRS_LOADING });

    const { _id, path } = formData;
    const { data } = await conform.put(`/api/v1/watch/${_id}`, formData);

    dispatch({ type: UPDATE_WATCH_DIRS, payload: data.data });
    dispatch(setAlert(`${path} updated`));
  } catch (err) {
    dispatch({ type: SET_WATCH_DIRS_ERROR, payload: err.response.data });
  }
};

export const deleteWatchDir = ({ id, path }) => async (dispatch) => {
  try {
    dispatch({ type: SET_WATCH_DIRS_LOADING });

    await conform.delete(`/api/v1/watch/${id}`);
    dispatch({ type: DELETE_WATCH_DIR, payload: id });

    dispatch(setAlert(`${path} deleted`));
  } catch (err) {
    dispatch({ type: SET_WATCH_DIRS_ERROR, payload: err.response.data });
  }
};

export const clearWatchDirs = () => {
  return { type: CLEAR_WATCH_DIRS };
};

export const setAlert = (message) => (dispatch) => {
  dispatch({ type: SET_ALERT, payload: message });
  dispatch({ type: CLEAR_ALERT });
};
