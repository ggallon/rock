import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  console.log('[server] startup');

  // Set html lang attribute
  WebApp.addHtmlAttributeHook(() => ({ lang: 'fr' }));
});
