import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
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
              ref={form => (this.signupForm = form)}
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormGroup>
                    <ControlLabel>Prénom</ControlLabel>
                    <FormControl
                      type="text"
                      name="firstName"
                      placeholder="prénom"
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormGroup>
                    <ControlLabel>Nom</ControlLabel>
                    <FormControl
                      type="text"
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
                  name="emailAddress"
                  placeholder="nom@exemple.com"
                />
                <HelpBlock>Cette adresse e-mail sera votre identifiant.</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirmation mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  name="repeatPassword"
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

export default withRouter(Signup);
