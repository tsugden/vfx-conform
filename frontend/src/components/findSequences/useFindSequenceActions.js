// React
import { useReducer } from "react";

// API
import conform from "../../api/conform";

const useFindSequenceActions = (projectId) => {
  const SET_LOADING = "SET_LOADING";
  const SET_ERROR = "SET_ERROR";
  const SET_SEARCH_TERM = "SET_SEARCH_TERM";
  const SET_SELECT_TERM = "SET_SELECT_TERM";
  const GET_SEQUENCES = "GET_SEQUENCES";
  const CLEAR_SEARCH = "CLEAR_SEARCH";

  const initialState = {
    searchTerm: "",
    selectTerm: "",
    sequences: [],
    loading: false,
    error: null,
  };

  const sequenceReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };

      case SET_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };

      case SET_SEARCH_TERM:
        return {
          ...state,
          searchTerm: payload,
        };

      case SET_SELECT_TERM:
        return {
          ...state,
          selectTerm: payload,
        };

      case GET_SEQUENCES:
        return {
          ...state,
          sequences: payload,
          loading: false,
        };

      case CLEAR_SEARCH:
        return {
          ...state,
          searchTerm: "",
          sequences: [],
        };

      default:
        throw new Error(`Unrecognised type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(sequenceReducer, initialState);
  const { searchTerm, selectTerm } = state;

  /*
   * Actions
   */

  const setSearchTerm = (term) => {
    dispatch({ type: SET_SEARCH_TERM, payload: term });
  };

  const setSelectTerm = (term) => {
    dispatch({ type: SET_SELECT_TERM, payload: term });
  };

  const getSequences = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await conform({
        method: "get",
        url: `/api/v1/project/${projectId}/sequences`,
        params: {
          name: searchTerm,
        },
      });
      dispatch({ type: GET_SEQUENCES, payload: data.sequences });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  return [state, setSearchTerm, setSelectTerm, clearSearch, getSequences];
};

export default useFindSequenceActions;
