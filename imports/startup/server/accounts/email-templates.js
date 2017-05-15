/**
 *  Customize Accounts Email Template
 *
 * @summary Options to customize emails sent from the Accounts system
 * @locus Server
 * @importFromPackage accounts-base
 */
import { Accounts } from 'meteor/accounts-base';

const siteName = 'Rock';
const email = '<support@rock.com>';
const from = `${siteName} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = siteName;
emailTemplates.from = from;

/**
 *  Template Reset Password
 */
emailTemplates.resetPassword = {
  subject() {
    return `[${siteName}] Réinitialisation de votre mot de passe`;
  },
  text(user, url) {
    const userName = user.name ? `${user.name.first} ${user.name.last}` : '';
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    return `Bonjour ${userName},
    \n\nVous avez demandé la réinitialisation du mot de passe associé
    à l'identifiant ${userEmail}.
    \n\nCliquez ici pour réinitialiser votre mot de passe : ${urlWithoutHash}
    \n\nVous allez être redirigé vers une page où vous pourrez renseigner un
    nouveau mot de passe qui servira pour vos prochaines connexions.
    \n\nSi vous n'avez pas demander la réinitialisation de votre mot de passe,
    contacter notre équipe support : ${email}.
    \n\nL'équipe ${siteName}`;
  },
};
