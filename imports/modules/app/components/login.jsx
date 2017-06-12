import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import { SubmitField } from 'uniforms-bootstrap3';
import LoginSchema from '/imports/modules/app/lib/loginSchema';

class Login extends Component {
  constructor() {
    super();
    this.state = { loginError: null };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onChange() {
    this.setState({ loginError: null });
  }

  onSubmit({ email, password }) {
    return new Promise((resolve, reject) =>
      Meteor.loginWithPassword(email, password, error =>
        error ? reject(error) : resolve(),
      ),
    );
  }

  onSubmitFailure(error) {
    this.setState({ loginError: error });
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
    const CustomSubmitField = () => <SubmitField value="Continuer" className="pull-right" />;

    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={5} md={4} lg={4} className="center-block">
            <h4 className="page-header">Connexion à Rock</h4>
            <AutoForm
              schema={LoginSchema}
              placeholder
              label={false}
              error={this.state.loginError}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
              submitField={CustomSubmitField}
            >
            </AutoForm>
            <p><Link to="/recover-password" className="pull-left">Mot de passe oublié ?</Link></p>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.defaultProps = {
  history: null,
  location: null,
};

Login.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Login);
