import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import useAlert from "../hooks/useAlert";

import { login } from "../../actions/authActions";

import "./Login.css";

const Login = ({ login, auth }) => {
  const initalState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initalState);
  const { username, password } = user;
  const { isAuthenticated, error } = auth;

  const history = useHistory();
  const message = useAlert(error, 2000);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onFormChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <main id="login">
      <div className="form-container card pad-02 bg-grey-08">
        <h6 className="col-grey-02">Loginz</h6>

        <form onSubmit={onFormSubmit}>
          <input
            className="text-input"
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={onFormChange}
            required
          />
          <input
            className="text-input"
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={onFormChange}
            required
          />
          <button className="btn btn-block col-grey-02 bg-grey-06">
            Login
          </button>
        </form>

        <div className="form-alert col-grey-02">
          {message && (
            <h5>
              <i className="fas fa-exclamation-circle" />
              {" " + message}
            </h5>
          )}
        </div>
      </div>
    </main>
  );
};

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
