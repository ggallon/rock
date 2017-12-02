import { BrowserPolicy } from 'meteor/browser-policy-common';

/**
 * Set browser policies
 */
if (process.env.NODE_ENV === 'development') {
  BrowserPolicy.content.allowOriginForAll('localhost:*');
  BrowserPolicy.content.allowConnectOrigin('ws://localhost:*');
  BrowserPolicy.content.allowConnectOrigin('wss://localhost:*');
  BrowserPolicy.content.allowConnectOrigin('http://localhost:*');
  BrowserPolicy.content.allowConnectOrigin('https://localhost:*');
  BrowserPolicy.framing.allowAll();
}

BrowserPolicy.content.allowConnectOrigin('ws:');
BrowserPolicy.content.allowConnectOrigin('wss:');

BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
