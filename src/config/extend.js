const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const got = require('../extend/got')

module.exports = [
  view, // make application support view
  model(think.app),
  got, // HTTP request client
  cache,
  session
];
