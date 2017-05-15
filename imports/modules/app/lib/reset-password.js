/* eslint-disable no-undef */
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import '/imports/lib/validation';

let component;

const handleReset = () => {
  const { history, match } = component.props;
  const password = document.querySelector('[name="newPassword"]').value;

  Accounts.resetPassword(match.params.token, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      history.push('/');
      Bert.alert('Password reset!', 'success');
    }
  });
};

const validate = () => {
  $(component.resetPasswordForm).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 8,
      },
      repeatNewPassword: {
        required: true,
        equalTo: '[name="newPassword"]',
      },
    },
    messages: {
      newPassword: {
        required: 'Votre nouveau mot de passe est requis',
        minlength: 'Votre mot de passe doit comporter 8 caractères minimun.',
      },
      repeatNewPassword: {
        required: 'Vous devez confimer votre mot de passe',
        equalTo: 'Le mot de passe et sa confirmation sont différents',
      },
    },
    submitHandler() { handleReset(); },
  });
};

export default function handleResetPassword(options) {
  component = options.component;
  validate();
}
