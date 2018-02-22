import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import UserSchema from '../../../api/users/userSchema';

const RecoverPasswordSchema = UserSchema.pick('identifiant');

class RecoverPassword extends Component {
  constructor() {
    super();

    this.state = {
      recoverPasswordSuccess: false,
      recoverPasswordError: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onChange() {
    this.setState({ recoverPasswordError: null });
  }

  onSubmit({ identifiant }) {
    const email = identifiant;
    return new Promise((resolve, reject) =>
      Accounts.forgotPassword({ email }, error =>
        (error ? reject(error) : resolve())));
  }

  onSubmitFailure(error) {
    this.setState({ recoverPasswordError: error });
  }

  onSubmitSuccess() {
    this.setState({ recoverPasswordSuccess: true });
  }

  render() {
    const CustomSubmitField = () => <SubmitField value="Continuer" className="pull-right" />;

    return (
      <div className="recoverPassword">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Vous rencontrez des difficultés à vous connecter ?</h4>

            {this.state.recoverPasswordSuccess === false ?
              <div>
                <Alert bsStyle="info">
                  <h5><Glyphicon glyph="info-sign" /> Saisissez votre identifiant pour commencer</h5>
                  Si vous voulez réinitialiser un mot de passe, vous êtes au bon endroit...
                </Alert>
                <AutoForm
                  schema={RecoverPasswordSchema}
                  placeholder
                  label={false}
                  error={this.state.recoverPasswordError}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  onSubmitFailure={this.onSubmitFailure}
                  onSubmitSuccess={this.onSubmitSuccess}
                  submitField={CustomSubmitField}
                />
              </div>
              :
              <Alert bsStyle="success">
                <h5><Glyphicon glyph="send" /> Un e-mail vient de vous être envoyé.</h5>
                Vérifiez votre boîte de réception et cliquez sur le lien du mail
                pour réinitialiser votre mot de passe.
              </Alert>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecoverPassword;
