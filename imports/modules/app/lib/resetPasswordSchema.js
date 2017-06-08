import SimpleSchema from 'simpl-schema';

// Resolved error due to simpl-schema with "SimpleSchema.setDefaultMessages"
global.Buffer = global.Buffer || require("buffer").Buffer;

// Set custom message for custom repeatNewPassword field validation
SimpleSchema.setDefaultMessages({
  messages: {
    en: { passwordMismatch: 'Passwords do not match' },
    fr: { passwordMismatch: 'Les mots de passe ne correspondents pas' }
  },
});

const ResetPasswordSchema = new SimpleSchema({
  newPassword: {
    label: 'Nouveau mot de passe',
    type: String,
    min: 8,
    uniforms: {
      type: 'password',
      placeholder: 'Nouveau mot de passe',
    },
  },
  repeatNewPassword: {
    label: 'Confimer mot de passe',
    type: String,
    min: 8,
    custom() {
      if (this.value !== this.field('newPassword').value) {
        return "passwordMismatch";
      }
    },
    uniforms: {
      type: 'password',
      placeholder: 'Confirmer mot de passe',
    },
  },
});

export default ResetPasswordSchema;
