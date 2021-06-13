// React
import { useReducer, useEffect } from "react";

// api
import conform from "../../api/conform";

const useTurnoverActions = (id) => {
  const SET_LOADING = "SET_LOADING";
  const SET_BUSY = "SET_BUSY";
  const SET_ERROR = "SET_ERROR";
  const GET_TURNOVERS = "GET_TURNOVERS";
  const UPDATE_TURNOVER = "UPDATE_TURNOVER";
  const CLEAR_STATE = "CLEAR_STATE";

  const turnoverReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };

      case SET_BUSY:
        return {
          ...state,
          current: state.current.map((c) =>
            payload.includes(c._id) ? { ...c, isBusy: true } : c
          ),
        };

      case GET_TURNOVERS:
        return {
          ...state,
          current: payload.current,
          missing: payload.missing,
          loading: false,
        };

      case UPDATE_TURNOVER:
        return {
          ...state,
          current: state.current.map((c) =>
            c._id === payload._id ? { ...payload, isBusy: false } : c
          ),
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
          current: [],
          missing: [],
          loading: false,
        };

      default:
        throw new Error(`Unrecognised type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(turnoverReducer, {
    current: [],
    missing: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const { data } = await conform({
          method: "get",
          url: `/api/v1/watch/${id}/turnover`,
        });
        dispatch({
          type: GET_TURNOVERS,
          payload: data.data,
        });
      } catch (err) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      }
    };
    fetchData();
  }, [id]);

  const index = async (id) => {
    dispatch({ type: SET_BUSY, payload: [id] });
    try {
      const { data } = await conform({
        method: "put",
        url: `/api/v1/turnover/${id}/index`,
      });
      dispatch({
        type: UPDATE_TURNOVER,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

  const forget = async (id) => {
    dispatch({ type: SET_BUSY, payload: [id] });
    try {
      const { data } = await conform({
        method: "delete",
        url: `/api/v1/turnover/${id}`,
      });
      dispatch({
        type: UPDATE_TURNOVER,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

  const indexAll = async (current) => {
    const newDirs = current
      .filter((dir) => dir.isIndexed === false)
      .map(({ _id }) => _id);

    dispatch({ type: SET_BUSY, payload: newDirs });
    try {
      const queries = newDirs.map((id) => {
        return {
          method: "put",
          url: `/api/v1/turnover/${id}/index`,
        };
      });

      // Promise.all ?
      queries.forEach(async (query) => {
        const { data } = await conform(query);
        dispatch({
          type: UPDATE_TURNOVER,
          payload: data.data,
        });
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

  return [state, index, indexAll, forget];
};

export default useTurnoverActions;
