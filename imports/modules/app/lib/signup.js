/* eslint-disable no-undef */
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import '/imports/lib/validation';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      const { history } = component.props;
      history.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
      repeatPassword: {
        required: true,
        equalTo: '[name="password"]',
      },
    },
    messages: {
      firstName: {
        required: 'Votre prénom est requis',
      },
      lastName: {
        required: 'Votre nom est requis',
      },
      emailAddress: {
        required: 'Votre identifiant (e-mail) est requis',
        email: 'Vous devez saisir une adresse e-mail valide',
      },
      password: {
        required: 'Votre mot de passe est requis',
        minlength: 'Votre mot de passe doit comporter 8 caractères minimun.',
      },
      repeatPassword: {
        required: 'Vous devez confimer votre mot de passe',
        equalTo: 'Le mot de passe et sa confirmation sont différents',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
