/* eslint-disable array-callback-return,no-undef */
const path = require('path');
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
const _ = require('lodash')

module.exports = options => {
  // if (!options.config) {
  //   options.config = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
  // }

  // let err = null

  const middleware = async (ctx, next) => {
    if (options.unless) {
      for (const item of options.unless) {
        if (ctx.url.match(ctx.url.match(item))) {
          return next()
        }
      }
    }
    // cookie
    // query 参数
    const openId = ctx.cookie('openId')
    const query = ctx.query
    const callbackUrl = `${apiConfig.proxyUrl}/activity/weChat/openId?callback=${apiConfig.hostUrl}`
    if (_.isEmpty(openId) && !_.has(query, 'openId')) {
      return ctx.redirect(callbackUrl)
    } else if (_.has(query, 'openId')) {
      ctx.cookie('openId', query.openId)
      // 创建或查询活动账户
      // post openId 查询活动账户信息
      return next()
    }
    return next()

    // if (options.unless) {
    //   for (const item of options.unless) {
    //     if (ctx.url.match(ctx.url.match(item))) {
    //       return next()
    //     }
    //   }
    // }
    // Default 404
    // ctx.status = options.status || 200
    // ctx.req.session = await ctx.session()
    // await nuxt.render(ctx.req, ctx.res)
  }
  return middleware
}
