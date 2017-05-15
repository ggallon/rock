/* eslint-disable no-undef */
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import '/imports/lib/validation';

let component;

const handleRecovery = () => {
  Accounts.forgotPassword({
    email: document.querySelector('[name="emailAddress"]').value,
  }, (error) => {
    if (error) {
      Bert.alert({
        title: 'L\'adresse e-mail saisie est inconnue',
        message: 'Nous vous invitons à vous connecter avec un autre identifiant',
        type: 'warning',
        style: 'fixed-top',
      });
    } else {
      Bert.alert({
        title: 'Un e-mail vient de vous être envoyé.',
        message: 'Vérifiez votre boîte de réception et cliquez sur le lien du mail pour réinitialiser votre mot de passe.',
        type: 'success',
        style: 'fixed-top',
        icon: 'fa-envelope',
      });
    }
  });
};

const validate = () => {
  $(component.recoverPasswordForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Votre identifiant (e-mail) est requis',
        email: 'Vous devez saisir une adresse e-mail valide',
      },
    },
    submitHandler() { handleRecovery(); },
  });
};

export default function handleRecoverPassword(options) {
  component = options.component;
  validate();
}
