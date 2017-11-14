import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

const userSchema = new SimpleSchema({
  givenName: {
    label: 'Prénom',
    type: String,
    uniforms: {
      type: 'text',
      placeholder: 'prénom',
    },
  },
  familyName: {
    label: 'Nom',
    type: String,
    uniforms: {
      type: 'text',
      placeholder: 'nom de famille',
    },
  },
  identifiant: {
    label: 'Identifiant (e-mail)',
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    uniforms: {
      type: 'email',
      placeholder: 'nom@exemple.com',
    },
  },
  password: {
    label: 'Mot de passe',
    type: String,
    min: 8,
    uniforms: {
      type: 'password',
      placeholder: 'Mot de passe',
    },
  },
  repeatPassword: {
    label: 'Confimer mot de passe',
    type: String,
    custom() {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      }
    },
    uniforms: {
      type: 'password',
      placeholder: 'Confirmer mot de passe',
    },
  },
});

export default userSchema;
