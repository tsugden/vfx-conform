import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { loadState, saveState } from "./utils/store";

const middleware = [thunk];
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveState({
    auth: { ...store.getState().auth },
    project: { selected: store.getState().project.selected },
  });
});

export default store;
