import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

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
