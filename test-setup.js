process.env.SESSION_SECRET = 'test-session-secret';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window;
global.document = dom.window.document;
// global.navigator is already defined as a getter in Node 24+; skip it
global.HTMLElement = dom.window.HTMLElement;
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
