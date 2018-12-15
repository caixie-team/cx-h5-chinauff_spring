const path = require('path');
const isDev = think.env === 'development';
const config = require(path.join(think.ROOT_PATH, '/nuxt.config.js'))

const nuxt = require('think-nuxt')

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
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle: nuxt,
    options: {
      config: config,
      unless: [/^\/api?/],
      isDev: isDev
    }
  },
  'logic',
  'controller'
];
