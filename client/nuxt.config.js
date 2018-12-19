/**
 * @file App config / Commonjs module
 * @module nuxt.config
 * @author Baisheng <baisheng@caixie.top>
 */
const path = require('path')
const pkg = require('../package')
const apiConfig = require('./api.config')
const {isProdMode, isDevMode} = require('./environment')
// const PATHS = {
//   root: path.resolve(__dirname, '../'),
//   client: path.resolve(__dirname, '../client')
// }
const PATHS = {
  root: path.resolve(__dirname, '../'),
  client: path.resolve(__dirname, '../client')
}

module.exports = {
  mode: 'universal',
  dev: isDevMode,
  rootDir: PATHS.root,
  srcDir: PATHS.client,
  // buildDir: './build/',
  env: {
    baseUrl: apiConfig.baseUrl,
    HOST_URL: apiConfig.socketHost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '老娘舅新春集福享好礼',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },


  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  styleResources: {
    stylus: [
      './assets/stylus/variable.styl',
      './assets/stylus/mixin.styl'
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // '~/assets/css/tailwind.css'
    './assets/stylus/index.styl'
    // '~/assets/test.styl'
    // '~/assets/test.css'
  ],

  /*
  ** Build configuration
  */
  build: {
    // devMiddleware: {
    //   noInfo: true,
    //   quiet: true
    // },
    // analyze: true
    // 设置 CDN 地址，将 nuxt 内容传至 cdn 加速
    // publicPath: 'https://weixin.chinauff.com/spring/_nuxt/',
    publicPath: 'http://weixin.chinauff.com/spring/client/',
    // publicPath: '/spring/_nuxt/',
    // publicPath: apiConfig.cdnUrl + '/_nuxt/',
    // publicPath: '/spring/_nuxt/',
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        'postcss-px-to-viewport-rxdey': {
          viewportWidth: 640,
          viewportHeight: 1136,
          unitPrecision: 3,
          viewportUnit: 'vw',
          selectorBlackList: ['.ignore', '.van'],
          minPixelValue: 1,
          mediaQuery: false,
          exclude: ['node_modules'],
          rules: {
            path: 'node_modules',
            fn: (pixels, vw, opt) => {
              return vw * 2 + 'vw';
            },
          }
        }
        // Disable a plugin by passing false as value
        // 'postcss-url': false,
        // 'postcss-nested': {},
        // 'postcss-responsive-type': {},
        // 'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // config.output.publicPath = 'http://weixin.chinauff.com/spring/_nuxt/'
      // config.hotMiddleware.path = apiConfig.cdnUrl
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        // config.entry.app
        // 'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false'
        // config.hotMiddleware.path = '/h5'
        // 解决路径找不到资源
        // config.output.publicPath = '_nuxt/'
        // config.output.publicPath = 'https://weixin.chinauff.com/spring/_nuxt/'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    vendor: [
      'axios',
      'vant'
    ],
    maxChunkSize: 350000,
    // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets ({isServer}) {
        return [
          [
            '@nuxtjs/babel-preset-app',
            {targets: isServer ? {node: '10.4.0'} : {chrome: 69}}
          ]
        ]
      },
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator',
        // [
        // 'babel-plugin-vant-component',
        // 'component',
        // {
        //   libraryName: 'vant',
        //   base: true,
        //   style: true
        // }
        // ]
      ],
      comments: true
    },
  },
  router: {
    scrollBehavior (to, from, savedPosition) {
      return {x: 0, y: 0}
    },
    extendRoutes(routes) {}
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/loaded-task.js'},
    {src: '~/plugins/nuxt-client-init.js', ssr: false},
    {src: '~/plugins/wechat-jssdk.js', ssr: false},
    {src: '~/plugins/router.js', ssr: false},
    {src: '~/plugins/ui.js', ssr: false},
    // {src: '~/plugins/tracker.js'},
    // {src: '~/plugins/ahoy-analytics.js', ssr: false},
    // {src: '~/plugins/vant-ui.js'},
  ]
}

