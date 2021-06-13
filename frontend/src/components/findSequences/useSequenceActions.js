// React
import { useReducer } from "react";

// API
import conform from "../../api/conform";

// Libraries
import { range } from "lodash";

const useSequenceActions = (projectId) => {
  const SET_LOADING = "SET_LOADING";
  const SET_ERROR = "SET_ERROR";
  const SET_SEARCH_TERM = "SET_SEARCH_TERM";
  const GET_SEQUENCES = "GET_SEQUENCES";
  const SET_SELECTED = "SET_SELECTED";
  const REFRESH_SELECTED = "REFRESH_SELECTED";
  const APPEND_SELECTED = "APPEND_SELECTED";
  const EXTEND_SELECTED = "EXTEND_SELECTED";
  const CLEAR_SELECTED = "CLEAR_SELECTED";
  const COMMIT_SELECTION = "COMMIT_SELECTION";
  const CLEAR_SEARCH = "CLEAR_SEARCH";
  const SORT_TABLE = "SORT_TABLE";

  const initialState = {
    searchTerm: "",
    selected: [],
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

      case GET_SEQUENCES:
        return {
          ...state,
          sequences: payload,
          loading: false,
        };

      case SET_SELECTED:
        return {
          ...state,
          selected: state.selected.includes(payload) ? [] : [payload],
        };

      case REFRESH_SELECTED:
        return {
          ...state,
          selected: state.sequences
            .map((seq, index) => (seq.isSelected ? index : null))
            .filter(Boolean),
        };

      case APPEND_SELECTED:
        return {
          ...state,
          selected: state.selected.includes(payload)
            ? state.selected.filter((s) => s !== payload)
            : [...state.selected, payload],
        };

      case EXTEND_SELECTED:
        return {
          ...state,
          selected: [...state.selected, ...payload],
        };

      case CLEAR_SELECTED:
        return {
          ...state,
          selected: [],
        };

      case COMMIT_SELECTION:
        return {
          ...state,
          sequences: state.sequences.map((seq, index) =>
            state.selected.includes(index)
              ? { ...seq, isSelected: true }
              : { ...seq, isSelected: false }
          ),
        };

      case CLEAR_SEARCH:
        return {
          ...state,
          searchTerm: "",
          sequences: [],
          selected: [],
        };

      case SORT_TABLE:
        return {
          ...state,
          sequences: payload,
        };

      default:
        throw new Error(`Unrecognised type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(sequenceReducer, initialState);

  const { searchTerm, sequences, selected } = state;

  /*
   * Actions
   */

  const setSearchTerm = (term) => {
    dispatch({ type: SET_SEARCH_TERM, payload: term });
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

  const setSelected = (index) => {
    dispatch({ type: SET_SELECTED, payload: index });
    dispatch({ type: COMMIT_SELECTION });
  };

  const appendSelected = (index) => {
    dispatch({ type: APPEND_SELECTED, payload: index });
    dispatch({ type: COMMIT_SELECTION });
  };

  const extendSelected = (index) => {
    let previous = selected[selected.length - 1] || 0;
    let next = index;

    if (previous < next) {
      previous += 1;
      next += 1;
    } else {
      previous -= 1;
      next -= 1;
    }

    const extendedSelection = range(previous, next).filter(
      (n) => !selected.includes(n)
    );

    dispatch({ type: EXTEND_SELECTED, payload: extendedSelection });
    dispatch({ type: COMMIT_SELECTION });
  };

  const clearSelected = () => {
    dispatch({ type: CLEAR_SELECTED });
    dispatch({ type: COMMIT_SELECTION });
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
    clearSelected();
  };

  const sortTable = (column, ascending) => {
    const sorted = [...sequences].sort((a, b) => {
      const x = a[column];
      const y = b[column];
      return ascending ? (x > y ? 1 : -1) : x < y ? 1 : -1;
    });

    dispatch({ type: SORT_TABLE, payload: sorted });
    dispatch({ type: REFRESH_SELECTED });
  };

  return [
    state,
    setSearchTerm,
    clearSearch,
    getSequences,
    setSelected,
    appendSelected,
    extendSelected,
    clearSelected,
    sortTable,
  ];
};

export default useSequenceActions;
