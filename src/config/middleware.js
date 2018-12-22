/* eslint-disable no-undef */
const path = require('path');
const isDev = think.env === 'development';
const nuxtConfig = require(path.join(think.ROOT_PATH, 'client/nuxt.config.js'))
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
// const nuxt = require('think-nuxt')
const chinauff = require('../middleware/chinauff')
const nuxt = require('../middleware/nuxt')

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '20mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle: chinauff
  },
  {
    handle: nuxt,
    options: {
      config: nuxtConfig,
      unless: [/^\/api?/, /^\/landing?/, /^\/callback?/],
      isDev: isDev
    }
  },
  'logic',
  'controller'
];
