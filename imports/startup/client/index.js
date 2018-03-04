import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import AppState from '../../ui/components/appState';
import AppContainer from '../../ui/containers/appContainer';

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

/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
  render(
    <AppState>
      <AppContainer />
    </AppState>,
    document.getElementById('react-root'),
  );
});
