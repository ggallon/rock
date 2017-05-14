import React, { Component } from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import handleRecoverPassword from '/imports/lib/recover-password';

class RecoverPassword extends Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Vous rencontrez des difficultés à vous connecter ?</h4>
            <Alert bsStyle="info">
              <h5>Saisissez votre identifiant pour commencer</h5>
              Si vous voulez réinitialiser un mot de passe, déverrouiller un compte, vous êtes au bon endroit...
            </Alert>
            <form
              ref={form => (this.recoverPasswordForm = form)}
              className="recover-password"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <FormControl
                  type="email"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="Veuillez saisir votre identifiant (e-mail)"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success" className="pull-right">Continuer</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecoverPassword;
