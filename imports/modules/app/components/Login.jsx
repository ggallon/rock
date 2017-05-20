import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../lib/login';

class Login extends Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={5} md={4} lg={4} className="center-block">
            <h4 className="page-header">Connexion à Rock</h4>
            <form
              ref={form => (this.loginForm = form)}
              className="form-login"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <ControlLabel className="sr-only">Identifiant</ControlLabel>
                <FormControl
                  type="email"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="Identifiant"
                  bsSize="large"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="sr-only">Mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="password"
                  name="password"
                  placeholder="Mot de passe"
                  bsSize="large"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success" className="pull-right">Continuer</Button>
            </form>
            <p><Link to="/recover-password" className="pull-left">Mot de passe oublié ?</Link></p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
