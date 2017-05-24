import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

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
                <ControlLabel srOnly>Identifiant</ControlLabel>
                <FormControl
                  type="email"
                  name="emailAddress"
                  placeholder="Identifiant"
                  bsSize="large"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel srOnly>Mot de passe</ControlLabel>
                <FormControl
                  type="password"
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
