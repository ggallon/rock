import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';

// Resolved error due to simpl-schema with "SimpleSchema.setDefaultMessages"
global.Buffer = global.Buffer || require('buffer').Buffer;

/**
 * French translation of the Default Messages of SimpeSchema
 */
const regExpMessages = [
  { exp: SimpleSchema.RegEx.Email, msg: 'doit être une adresse e-mail valide' },
  { exp: SimpleSchema.RegEx.EmailWithTLD, msg: 'doit être une adresse e-mail valide' },
  { exp: SimpleSchema.RegEx.Domain, msg: 'doit être un domaine validen' },
  { exp: SimpleSchema.RegEx.WeakDomain, msg: 'doit être un domaine valide' },
  { exp: SimpleSchema.RegEx.IP, msg: 'doit être une adrresse IPv4 or IPv6 valide' },
  { exp: SimpleSchema.RegEx.IPv4, msg: 'doit être une adrresse IPv4 valide' },
  { exp: SimpleSchema.RegEx.IPv6, msg: 'doit être une adrresse IPv6 valide' },
  { exp: SimpleSchema.RegEx.Url, msg: 'doit être une URL valide' },
  { exp: SimpleSchema.RegEx.Id, msg: 'doit être un identifiant alphanumérique valide' },
  { exp: SimpleSchema.RegEx.ZipCode, msg: 'doit être un code postal valide' },
  { exp: SimpleSchema.RegEx.Phone, msg: 'doit être un nuémro de téléphone valide' },
];

SimpleSchema.setDefaultMessages({
  initialLanguage: 'fr',
  messages: {
    en: { passwordMismatch: 'Passwords do not match' },
    fr: {
      required: '{{label}} est requis',
      minString: '{{label}} doit contenir au minimun {{min}} caractère(s)',
      maxString: '{{label}} doit contenir au maximum {{max}} caractère(s)',
      minNumber: '{{Label}} doit être superieur ou égal à {{min}}',
      maxNumber: '{{label}} doit être inferieur ou égal à {{max}}',
      minNumberExclusive: '{{label}} doit être superieur à {{min}}',
      maxNumberExclusive: '{{label}} doit être inferieur à {{max}}',
      minDate: '{{label}} doit est posterieure au {{min}}',
      maxDate: '{{label}} doit est anterieure au {{max}}',
      badDate: '{{label}} doit être une date valide',
      minCount: '{{label}} doit contenir au minimun {{minCount}} valeur(s)',
      maxCount: '{{label}} doit contenir au maximum {{maxCount}} valeur(s)',
      noDecimal: '{{label}} doit être un entier',
      notAllowed: '{{value}} n\'est pas une valeur acceptée',
      expectedType: '{{label}} doit être de type {{dataType}}',
      passwordMismatch: 'Les mots de passe ne correspondents pas',
      regEx({
        label,
        regExp,
      }) {
        // See if there's one where exp matches this expression
        let msgObj;
        if (regExp) {
          msgObj = _.find(regExpMessages, (o) => o.exp && o.exp.toString() === regExp);
        }

        const regExpMessage = msgObj ? msgObj.msg : 'Validation d\'expression régulière non valide';

        return `${label} ${regExpMessage}`;
      },
      keyNotInSchema: 'Le champ {{name}} n\'est pas permis par le schéma',
    },
  },
});
