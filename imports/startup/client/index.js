import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import App from '/imports/ui/layouts/app';

// Imports Bootstrap stylesheet
// Hack for import Bootstrap before "merged-stylesheets.css"
const bootstrapCSS = document.createElement('link');
bootstrapCSS.setAttribute('rel', 'stylesheet');
bootstrapCSS.setAttribute('type', 'text/css');
bootstrapCSS.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
bootstrapCSS.setAttribute('integrity', 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u');
bootstrapCSS.setAttribute('crossorigin', 'anonymous');
const headFirstChild = document.querySelector('head').firstChild;
document.querySelector('head').insertBefore(bootstrapCSS, headFirstChild);

// Bert settings
Bert.defaults = {
  hideDelay: 7000,
  style: 'growl-top-right',
  type: 'default',
};

Meteor.startup(() => {
  render(
    <App />,
    document.getElementById('react-root'),
  );
});
