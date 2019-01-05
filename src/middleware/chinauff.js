/* eslint-disable array-callback-return,no-undef */
const path = require('path');
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
const _ = require('lodash')
const openIdKey = '09e96454730650a6'
// this.key = '09e96454730650a6'
const crypto = require('crypto');

const globalEncrypt = (text, key) => {
  let cipher = crypto.createCipheriv("des-ecb", new Buffer(key), new Buffer(0));
  let encrypt = cipher.update(text, 'utf8', 'base64');
  encrypt += cipher.final('base64');
  return encrypt;
}
module.exports = options => {

  const middleware = async (ctx, next) => {
    if (options.unless) {
      for (const item of options.unless) {
        if (ctx.url.match(ctx.url.match(item))) {
          return next()
        }
      }
    }
    const activityUser = await ctx.session('activity_user')
    if (_.isEmpty(activityUser)) {
      const openId = await ctx.cookie('openId') || await ctx.session('openId')
      const query = ctx.query
      const encodeURI = encodeURIComponent(`${apiConfig.domain}${ctx.req.url}`)
      // const callbackUrl = `${apiConfig.proxyUrl}/activity/weChat/openId?callback=${encodeURI}`
      const callbackUrl = `http://crm.chinauff.com/lnj-weixin/console/activity/weChat/openId?callback=${encodeURI}`
      // 请求地址中不包含 openId
      if (_.isEmpty(openId) && !_.has(query, 'openId')) {
        return ctx.redirect(callbackUrl)
      } else if (_.has(query, 'openId') || !_.isEmpty(openId)) { // 请求地址中包含 openId
        const _openId = _.has(query, 'openId') ? query.openId : openId

        await ctx.cookie('openId', _openId)
        await ctx.session('openId', _openId)

        const postData = {
          openId: _openId,
          avatar: ''
        }
        if (_.has(query, 'headimgurl')) {
          postData.avatar = query.headimgurl
        }
        // console.log('查询 活动账户信息。。。。。。')
        // 创建或查询活动账户
        let res = (await think.got.post(apiConfig.baseUrl + '/account/take', {
          json: true,
          form: true,
          body: postData
        })).body
        res.data.beOpenId = encrypt(_openId, openIdKey)
        // 活动账户的信息，包括登录状态和会员信息
        // if Login status === 1
        await ctx.session('activity_user', JSON.stringify(res.data))

        return next()
      }
    }
    return next()
  }
  return middleware
}
