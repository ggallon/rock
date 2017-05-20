import { BrowserPolicy } from 'meteor/browser-policy-common';
BrowserPolicy.content.allowConnectOrigin("wss:");
BrowserPolicy.content.allowConnectOrigin("ws:");
BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');

