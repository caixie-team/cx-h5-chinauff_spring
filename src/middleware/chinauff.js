/* eslint-disable array-callback-return,no-undef */
const path = require('path');
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
const _ = require('lodash')
const openIdKey = 'bacd$!#@'

module.exports = options => {

  const middleware = async (ctx, next) => {
    if (options.unless) {
      for (const item of options.unless) {
        if (ctx.url.match(ctx.url.match(item))) {
          return next()
        }
      }
    }
    const openId = await ctx.cookie('openId') || await ctx.session('openId')
    const query = ctx.query
    const encodeURI = encodeURIComponent(`${apiConfig.domain}${ctx.req.url}`)
    const callbackUrl = `${apiConfig.proxyUrl}/activity/weChat/openId?callback=${encodeURI}`
    // console.log(ctx.querystring)
    // 请求地址中不包含 openId
    if (_.isEmpty(openId) && !_.has(query, 'openId')) {
      return ctx.redirect(callbackUrl)
    } else if (_.has(query, 'openId') || !_.isEmpty(openId)) { // 请求地址中包含 openId
      const _openId = _.has(query, 'openId') ? query.openId : openId
      if (!_.has(query, 'openId')) {
        ctx.querystring += `openId=${openId}`
      }
      // 加密 openId
      await ctx.cookie('openId', query.openId)
      await ctx.session('openId', query.openId)
      const postData = {
        openId: _openId,
        avatar: ''
      }
      if (_.has(query, 'headimgurl')) {
        postData.avatar = query.headimgurl
      }
      // 创建或查询活动账户
      const res = (await think.got.post(apiConfig.baseUrl + '/account/take', {
        json: true,
        form: true,
        body: postData
      })).body

      await ctx.session('activity_user', JSON.stringify(res.data))

      return next()
    }
    return next()
  }
  return middleware
}
