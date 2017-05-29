import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import handleRecoverPassword from '../lib/recover-password';

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
              Si vous voulez réinitialiser un mot de passe, vous êtes au bon endroit...
            </Alert>
            <form
              ref={form => (this.recoverPasswordForm = form)}
              className="recover-password"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <ControlLabel srOnly>Identifiant</ControlLabel>
                <FormControl
                  type="email"
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
