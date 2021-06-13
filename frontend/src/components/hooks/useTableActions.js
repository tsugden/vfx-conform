// React
import { useReducer, useEffect } from "react";

// Libraries
import { range } from "lodash";

const useTableActions = (initialData = []) => {
  const SET_DATA = "SET_DATA";
  const SET_SELECTED = "SET_SELECTED";
  const TOGGLE_SELECTED = "TOGGLE_SELECTED";
  const APPEND_SELECTED = "APPEND_SELECTED";
  const EXTEND_SELECTED = "EXTEND_SELECTED";
  const MERGE_SELECTED = "MERGE_SELECTED";
  const REFRESH_SELECTED = "REFRESH_SELECTED";
  const CLEAR_SELECTED = "CLEAR_SELECTED";
  const COMMIT_SELECTION = "COMMIT_SELECTION";

  const initialTableState = {
    data: initialData,
    selected: [],
  };

  const initialRowState = (data) => {
    return {
      data,
      isSelected: false,
    };
  };

  const tableReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_DATA:
        return {
          ...state,
          data: payload,
        };

      case TOGGLE_SELECTED:
        return {
          ...state,
          selected: state.selected.includes(payload) ? [] : [payload],
        };

      case CLEAR_SELECTED:
        return {
          ...state,
          selected: [],
        };

      case SET_SELECTED:
        return {
          ...state,
          selected: payload,
        };

      case APPEND_SELECTED:
        return {
          ...state,
          selected: state.selected.includes(payload)
            ? state.selected.filter((index) => index !== payload)
            : [...state.selected, payload],
        };

      case MERGE_SELECTED:
        return {
          ...state,
          selected: [
            ...state.selected,
            ...payload.filter((index) => !state.selected.includes(index)),
          ],
        };

      case EXTEND_SELECTED:
        return {
          ...state,
          selected: [...state.selected, ...payload],
        };

      case REFRESH_SELECTED:
        return {
          ...state,
          selected: state.data.reduce((result, current, index) => {
            if (current.isSelected) {
              return [...result, index];
            }
            return result;
          }, []),
        };

      case COMMIT_SELECTION:
        return {
          ...state,
          data: state.data.map((row, index) =>
            state.selected.includes(index)
              ? { ...row, isSelected: true }
              : { ...row, isSelected: false }
          ),
        };

      default:
        throw new Error(`Unrecognised type: ${type}`);
    }
  };

  const [{ data, selected }, dispatch] = useReducer(
    tableReducer,
    initialTableState
  );

  const setData = (data) => {
    const rows = data.map((row) => initialRowState(row));
    dispatch({ type: SET_DATA, payload: rows });
  };

  const toggleSelected = (index) => {
    dispatch({ type: TOGGLE_SELECTED, payload: index });
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

  const invertSelected = () => {
    const inverted = data.reduce((result, current, index) => {
      if (!current.isSelected) {
        return [...result, index];
      }
      return result;
    }, []);

    dispatch({ type: SET_SELECTED, payload: inverted });
    dispatch({ type: COMMIT_SELECTION });
  };

  const sortTable = (column, ascending) => {
    const sorted = [...data].sort((a, b) => {
      const x = a.data[column];
      const y = b.data[column];
      return ascending ? (x > y ? 1 : -1) : x < y ? 1 : -1;
    });

    dispatch({ type: SET_DATA, payload: sorted });
    dispatch({ type: REFRESH_SELECTED });
  };

  const matchString = (column, term, merge = false) => {
    const matched = data.reduce((result, current, index) => {
      const string = current.data[column];
      const regex = new RegExp(term, "i");

      if (string.match(regex)) {
        return [...result, index];
      }
      return result;
    }, []);

    const type = merge ? MERGE_SELECTED : SET_SELECTED;

    dispatch({ type: type, payload: matched });
    dispatch({ type: COMMIT_SELECTION });
  };

  return [
    data,
    selected,
    setData,
    toggleSelected,
    appendSelected,
    extendSelected,
    clearSelected,
    sortTable,
    matchString,
    invertSelected,
  ];
};

export default useTableActions;
