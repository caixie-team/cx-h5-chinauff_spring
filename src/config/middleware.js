/* eslint-disable no-undef */
const path = require('path');
const isDev = think.env === 'development';
const config = require(path.join(think.ROOT_PATH, 'client/nuxt.config.js'))
const _ = require('lodash')
// const nuxt = require('think-nuxt')
const nuxt = require('./nuxt')

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
    handle: (option, app) => {
      return (ctx, next) => {
        // cookie
        // query 参数
        // const openId = ctx.cookie('openId')
        // const query = ctx.query
        // const callbackUrl = 'http://demo.micvs.com/lnj-weixin/console/activity/weChat/openId?callback=http://weixin.chinauff.com/spring/test/callback'
        // if (_.isEmpty(openId) && !_.has(query, 'openId')) {
        //   console.log('openid is null')
          // return ctx.redirect(callbackUrl)
          // return ctx.redirect(callbackUrl)
        // } else {
        //
          // if (query.openId)
          // console.log(ctx.query)

          // console.log(ctx.get('openId'))
          return next()
        // }
      }
    }
  },
  {
    handle: nuxt,
    options: {
      config: config,
      unless: [/^\/api?/, /^\/landing?/, /^\/callback?/],
      isDev: isDev
    }
  },
  'logic',
  'controller'
];
