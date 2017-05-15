import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import handleSignup from '../lib/signup';

class Signup extends Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Créer votre identifiant</h4>
            <p>Vous avez déjà un identifiant ? <Link to="/recover-password">Retrouvez-le ici</Link></p>
            <form
              ref={ form => (this.signupForm = form) }
              onSubmit={ this.handleSubmit }
            >
              <Row>
                <Col xs={6} sm={6}>
                  <FormGroup>
                    <ControlLabel>Prénom</ControlLabel>
                    <FormControl
                      type="text"
                      ref="firstName"
                      name="firstName"
                      placeholder="prénom"
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} sm={6}>
                  <FormGroup>
                    <ControlLabel>Nom</ControlLabel>
                    <FormControl
                      type="text"
                      ref="lastName"
                      name="lastName"
                      placeholder="nom de famille"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <ControlLabel>Identifiant (e-mail)</ControlLabel>
                <FormControl
                  type="text"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="nom@exemple.com"
                />
                <HelpBlock>Cette adresse e-mail sera votre nouvel identifiant.</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="password"
                  name="password"
                  placeholder="Mot de passe"
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

export default withRouter(Signup);
