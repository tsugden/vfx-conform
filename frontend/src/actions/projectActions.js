import conform from "../api/conform";

import {
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_SELECTED_PROJECT,
  CLEAR_SELECTED_PROJECT,
  SET_PROJECT_ERROR,
  CLEAR_PROJECT_ERROR,
  SET_ALERT,
  CLEAR_ALERT,
  SET_PROJECT_LOADING,
} from "./types";

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECT_LOADING });

    const { data } = await conform.get("/api/v1/project");

    dispatch({ type: GET_PROJECTS, payload: data.projects });
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const setSelectedProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: SET_SELECTED_PROJECT, payload: project });
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const clearSelectedProject = () => {
  return { type: CLEAR_SELECTED_PROJECT };
};

export const createProject = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECT_LOADING });

    const { data } = await conform.post("/api/v1/project", formData);

    const { project } = data;
    const { name } = project;

    dispatch({ type: CREATE_PROJECT, payload: project });
    dispatch(setAlert(`${name} project created`));
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const updateProject = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECT_LOADING });

    const { _id } = formData;
    const { data } = await conform.put(`/api/v1/projectId/${_id}`, formData);

    const { project } = data;
    const { name } = project;

    dispatch({ type: UPDATE_PROJECT, payload: project });
    dispatch(setAlert(`${name} project updated`));
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const deleteProject = ({ _id, name }) => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECT_LOADING });

    await conform.delete(`/api/v1/projectId/${_id}`);
    dispatch({ type: DELETE_PROJECT, payload: _id });

    dispatch(setAlert(`${name} deleted`));
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const setError = (message) => (dispatch) => {
  dispatch({ type: SET_PROJECT_ERROR, payload: message });
  dispatch({ type: CLEAR_PROJECT_ERROR });
};

export const setAlert = (message) => (dispatch) => {
  dispatch({ type: SET_ALERT, payload: message });
  dispatch({ type: CLEAR_ALERT });
};
