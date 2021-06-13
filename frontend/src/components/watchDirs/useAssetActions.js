// React
import { useState, useReducer, useEffect } from "react";

// API
import conform from "../../api/conform";

const useAssetActions = (initialID) => {
  const [projectID, setProjectID] = useState(initialID);

  const SET_LOADING = "SET_LOADING";
  const ADD_WATCH = "ADD_WATCH";
  const GET_WATCH = "GET_WATCH";
  const DELETE_WATCH = "DELETE_WATCH";
  const SET_ERROR = "SET_ERROR";
  const CLEAR_STATE = "CLEAR_STATE";

  const assetReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };

      case ADD_WATCH:
        return {
          ...state,
          directories: [...state.directories, payload],
          loading: false,
        };

      case GET_WATCH:
        return {
          ...state,
          directories: payload,
          loading: false,
        };

      case DELETE_WATCH:
        return {
          ...state,
          directories: state.directories.filter((dir) => dir._id !== payload),
          loading: false,
        };

      case SET_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };

      case CLEAR_STATE:
        return {
          ...state,
          directories: [],
        };

      default:
        throw new Error(`Unrecognised type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(assetReducer, {
    directories: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const { data } = await conform({
          method: "get",
          url: `/api/v1/project/${projectID}/watch`,
        });
        dispatch({
          type: GET_WATCH,
          payload: data.directories,
        });
      } catch (err) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      }
    };

    if (projectID !== null) {
      fetchData();
    }

    return () => dispatch({ type: CLEAR_STATE });
  }, [projectID]);

  const addPath = async (path) => {
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await conform({
        method: "post",
        url: `/api/v1/project/${projectID}/watch`,
        data: { path },
      });

      dispatch({
        type: ADD_WATCH,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

  const deletePath = async (id) => {
    dispatch({ type: SET_LOADING });
    try {
      await conform({
        method: "delete",
        url: `/api/v1/watch/${id}`,
      });
      dispatch({
        type: DELETE_WATCH,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

  return [state, setProjectID, addPath, deletePath];
};

export default useAssetActions;
