import { Accounts } from 'meteor/accounts-base';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
  passwordEnrollTokenExpirationInDays: 1,
  restrictCreationByEmailDomain: '',
  loginExpirationInDays: 7,
  passwordResetTokenExpirationInDays: 0.5,
  ambiguousErrorMessages: true,
});
