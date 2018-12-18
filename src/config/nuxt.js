/* eslint-disable array-callback-return,no-undef */
const path = require('path');
const {Nuxt, Builder} = require('nuxt')

module.exports = options => {
  if (!options.config) {
    options.config = require(path.join(think.ROOT_PATH, 'client/nuxt.config.js'))
  }

  const nuxt = new Nuxt(options.config)

  // if (options.isDev && options.startOnly !== false) {
  if (options.isDev) {
    new Builder(nuxt).build()
  }
  let err = null

  const middleware = async (ctx, next) => {
    console.log(ctx)
    if (options.unless) {
      for (const item of options.unless) {
        if (ctx.url.match(ctx.url.match(item))) {
          return next()
        }
      }
    }
    // Default 404
    ctx.status = options.status || 200
    ctx.req.session = await ctx.session()
    await nuxt.render(ctx.req, ctx.res)

    return next().catch(e => {
      err = e
    }).then(() => {
        if (err) {
          return Promise.reject(err);
        }
        // 如果后续执行逻辑有错误，则将错误返回
        return new Promise((resolve, reject) => {
          return {resolve, reject}
        })
      }
    )
  }
  return middleware
}
