import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import AutoFields from 'uniforms-bootstrap3/AutoFields';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import UserSchema from '../lib/userSchema';

class Signup extends Component {
  constructor() {
    super();

    this.state = { signupError: null };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onChange() {
    this.setState({ signupError: null });
  }

  onSubmit(formData) {
    return new Promise((resolve, reject) =>
      Meteor.call('users.insert', formData, error =>
        (error ? reject(error) : resolve())));
  }

  onSubmitFailure(error) {
    this.setState({ signupError: error });
  }

  onSubmitSuccess() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Créer votre identifiant</h4>
            <p>Vous avez déjà un identifiant ? <Link to="/recover-password">Retrouvez-le ici</Link></p>
            <AutoForm
              error={this.state.signupError}
              modelTransform={(mode, model) => {
                if (mode === 'submit') {
                  return _.omit(model, 'repeatPassword');
                }
                return model;
              }}
              onChange={this.onChange}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
              onSubmit={this.onSubmit}
              placeholder
              schema={UserSchema}
            >
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name="givenName" />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name="familyName" />
                </Col>
              </Row>
              <AutoField name="identifiant" help="Cette adresse e-mail sera votre identifiant." />
              <AutoFields fields={['password', 'repeatPassword']} />
              <ErrorsField />
              <SubmitField value="Confirmer" className="pull-right" />
            </AutoForm>
          </Col>
        </Row>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
