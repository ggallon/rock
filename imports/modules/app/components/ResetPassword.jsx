import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../lib/reset-password';

class ResetPassword extends Component {
  componentDidMount() {
    handleResetPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Renseigner votre nouveau nouveau mot de passe</h4>
            <Alert bsStyle="info">
              Votre mot de passe doit comporter un minimum de 8 caractères,
              il peut contenir des chiffres, des majuscules et des caractères spéciaux.
            </Alert>
            <form
              ref={form => (this.resetPasswordForm = form)}
              className="reset-password"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <ControlLabel>Nouveau mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="Mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirmation mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Mot de passe"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success" className="pull-right">Confirmer</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ResetPassword);
