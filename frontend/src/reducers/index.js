import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import projectReducer from "./projectReducer";
import dirReducer from "./dirReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  project: projectReducer,
  directory: dirReducer,
});
