import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";
import Header from "../components/header";
import Login from "./login";

import Home from "../components/home";
import WatchDirs from "../components/watchDirs";
import FindSequences from "../components/findSequences";
import OpenClipCreator from "../components/openClipCreator";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Header} />

      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/watch" component={WatchDirs} />
      <PrivateRoute exact path="/findsequences" component={FindSequences} />
      <PrivateRoute exact path="/openclipcreator" component={OpenClipCreator} />
    </Router>
  );
};

export default App;
