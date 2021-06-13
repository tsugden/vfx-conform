// React
import { useEffect, useState, useReducer } from "react";

// Api
import conform from "../../api/conform";

// Types
const SET_LOADING = "SET_LOADING";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const useFetchData = (initialRequest, initialData) => {
  const [request, setRequest] = useState(initialRequest);

  const dataGetReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };

      case FETCH_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };

      case FETCH_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(dataGetReducer, {
    data: initialData,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const { data } = await conform(request);
        dispatch({
          type: FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: FETCH_ERROR,
          payload: err.response.data,
        });
      }
    };
    fetchData();
  }, [request]);

  return [state, setRequest];
};

export default useFetchData;
