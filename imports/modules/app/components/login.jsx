import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import UserSchema from '../../../api/users/userSchema';

const LoginSchema = UserSchema.pick('identifiant', 'password');

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitGoogle = this.onSubmitGoogle.bind(this);
    this.onSubmitGoogleFailure = this.onSubmitGoogleFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  componentWillUnmount() {
    this.props.setAppState({ error: {} });
  }

  onChange() {
    this.props.setAppState({
      error: Object.assign({}, this.props.error, {
        loginError: null,
        loginGoogleError: null,
      }),
    });
  }

  onSubmit({ identifiant, password }) {
    return new Promise((resolve, reject) =>
      Meteor.loginWithPassword(identifiant, password, error =>
        (error ? reject(error) : resolve())));
  }

  onSubmitFailure(error) {
    this.props.setAppState({
      error: Object.assign({}, this.props.error, { loginError: error }),
    });
  }

  onSubmitGoogle() {
    return new Promise(() =>
      Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile', 'openid'],
        requestOfflineToken: true,
        loginUrlParameters: { prompt: 'select_account' },
        loginStyle: 'popup',
      }, error => (error
        ? this.onSubmitGoogleFailure(error)
        : this.onSubmitSuccess())));
  }

  onSubmitGoogleFailure(error) {
    this.props.setAppState({
      error: Object.assign({}, this.props.error, { loginGoogleError: error }),
    });
  }

  onSubmitSuccess() {
    const { location, history } = this.props;
    if (location.state && location.state.from.pathname) {
      history.push(location.state.from.pathname);
    } else {
      history.push('/');
    }
  }

  render() {
    const { error } = this.props.appState;
    const CustomSubmitField = () => <SubmitField value="Continuer" className="pull-right" />;

    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={5} md={4} lg={4} className="center-block">
            <h4 className="page-header">Connexion à Rock</h4>
            <button
              className="GoogleLoginButton"
              type="button"
              onClick={this.onSubmitGoogle}
            >
              <i className="fa fa-google" aria-hidden="true" /> Se connecter avec Google
            </button>
            {error && error.loginGoogleError
              ? <Alert bsStyle="warning">{error.loginGoogleError.reason}</Alert>
              : null}
            <div className="or-box">
              <span className="or">OU</span>
            </div>
            <AutoForm
              schema={LoginSchema}
              placeholder
              label={false}
              error={error && error.loginError}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
              submitField={CustomSubmitField}
            />
            <p><Link to="/recover-password" className="pull-left">Mot de passe oublié ?</Link></p>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.defaultProps = {
  error: {},
};

Login.propTypes = {
  error: PropTypes.object,
  appState: PropTypes.object.isRequired,
  setAppState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Login;
