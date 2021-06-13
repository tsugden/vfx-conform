import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { login } from "../../actions/authActions";

import "./Login.css";

const LoginForm = ({ isAuthenticated, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div id="login">
      <div className="form-container">
        <form onSubmit={onFormSubmit}>
          <input
            className="text-input"
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={onUsernameChange}
            required
          />
          <input
            className="text-input"
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={onPasswordChange}
            required
          />
          <button className="btn btn-block col-grey-02 bg-grey-06">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
