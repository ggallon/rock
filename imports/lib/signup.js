/* eslint-disable no-undef */
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation';

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
        minlength: 6,
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
        minlength: 'Il doit contenir au minimun 6 caractères',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
