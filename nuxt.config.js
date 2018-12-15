/**
 * @file App config / Commonjs module
 * @module nuxt.config
 * @author Baisheng <baisheng@caixie.top>
 */
const path = require('path')
const pkg = require('./package')
const apiConfig = require('./api.config')
const { isProdMode, isDevMode } = require('./environment')
// const PATHS = {
//   root: path.resolve(__dirname, '../'),
//   client: path.resolve(__dirname, '../client')
// }


module.exports = {
  mode: 'universal',
  // srcDir: 'h5/',
  // rootDir: 'h5/',
  // rootDir: PATHS.root,
  // srcDir: PATHS.client,
  // srcDir: __dirname,
  dev: isDevMode,
  srcDir: 'client/',
  buildDir: './build/',
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
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

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
    '~/assets/stylus/index.styl'
  ],
  /*
  ** Build configuration
  */
  build: {
    // base: process.env.NODE_ENV === 'dev' ? '/h5' : '/vue-a11y-calendar/',
    // hotMiddleware: {
    //   path: '/h5'
    // },

    // publicPath: 'h5/_nuxt/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        // config.hotMiddleware.path = '/h5'
        // 解决路径找不到资源
        // config.output.publicPath = '_nuxt/'

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
      presets ({ isServer }) {
        return [
          [
            '@nuxtjs/babel-preset-app',
            { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }
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
    }
  },
  router: {
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/loaded-task.js'},
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/wechat-jssdk.js', ssr: false },
    { src: '~/plugins/router.js', ssr: false },
    { src: '~/plugins/tracker.js' },
    { src: '~/plugins/ahoy-analytics.js', ssr: false },
    { src: '~/plugins/vant-ui.js'},
  ]
  /*
  ** Global CSS
  */
  // css: [
  //   '~/assets/css/tailwind.css'
  // ],
  // modules: [
  //   '@nuxtjs/proxy'
  // ],
  // proxy: {
  //   '/api': 'http://localhost:3001',
  //   ws: true
  // },
}

