import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import UserSchema from '../../../api/users/userSchema';

const ResetPasswordSchema = UserSchema.pick('password', 'repeatPassword');

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = { resetPasswordError: null };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onChange() {
    this.setState({ resetPasswordError: null });
  }

  onSubmit({ password }) {
    const { match } = this.props;
    return new Promise((resolve, reject) =>
      Accounts.resetPassword(match.params.token, password, error =>
        (error ? reject(error) : resolve())));
  }

  onSubmitFailure(error) {
    this.setState({ resetPasswordError: error });
  }

  onSubmitSuccess() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const CustomSubmitField = () => <SubmitField value="Confirmer" className="pull-right" />;

    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Renseigner votre nouveau nouveau mot de passe</h4>
            <Alert bsStyle="info">
              Votre mot de passe doit comporter un minimum de 8 caractères,
              il peut contenir des chiffres, des majuscules et des caractères spéciaux.
            </Alert>
            <AutoForm
              schema={ResetPasswordSchema}
              placeholder
              label={false}
              error={this.state.resetPasswordError}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
              submitField={CustomSubmitField}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
