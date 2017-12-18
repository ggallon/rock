import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

const parsedUrl = Meteor.absoluteUrl();
const hostname = parsedUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);

/**
 * Set browser policies
 */
if (process.env.NODE_ENV === 'development') {
  BrowserPolicy.content.allowOriginForAll(hostname[1] + ':*');
  BrowserPolicy.content.allowConnectOrigin('ws://' + hostname[1] + ':*');
  BrowserPolicy.content.allowConnectOrigin('wss://' + hostname[1] + ':*');
  BrowserPolicy.content.allowConnectOrigin('http://' + hostname[1] + ':*');
  BrowserPolicy.content.allowConnectOrigin('https://' + hostname[1] + ':*');
  BrowserPolicy.framing.allowAll();
}

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();

BrowserPolicy.content.allowConnectOrigin('ws:');
BrowserPolicy.content.allowConnectOrigin('wss:');

BrowserPolicy.content.allowFontOrigin('data:');

BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
