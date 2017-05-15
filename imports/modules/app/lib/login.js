/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '/imports/lib/validation';

let component;

const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert('Identification incorrecte', 'danger', 'fixed-top');
    } else {
      const { location, history } = component.props;
      if (location.state && location.state.from.pathname) {
        history.push(location.state.from.pathname);
      } else {
        history.push('/');
      }
    }
  });
};

const validate = () => {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Votre identifiant (e-mail) est requis',
        email: 'Vous devez saisir une adresse e-mail valide',
      },
      password: {
        required: 'Votre mot de passe est requis',
      },
    },
    submitHandler() { login(); },
  });
};

export default function handleLogin(options) {
  component = options.component;
  validate();
}
