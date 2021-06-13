import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import { login, clearError, loadUser } from "../../actions/authActions";

const Login = ({ clearError, login, auth }) => {
  const initalState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initalState);
  const { username, password } = user;
  const { isAuthenticated, error } = auth;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      // TODO: create alert system
      console.log(error);
      clearError();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onFormChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = () => {
    // TODO: change serverside name property to username
    login({ username, password });
  };

  return (
    <Fragment>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h4" color="blue" textAlign="center">
            Conform Login
          </Header>

          <Form size="large" onSubmit={onFormSubmit}>
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                name="username"
                value={username}
                onChange={onFormChange}
                required
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onFormChange}
                required
              />

              <Button color="blue" fluid size="small" content="Login" />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, clearError, login })(Login);
