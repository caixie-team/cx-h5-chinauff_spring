/* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
/* global PIXI */
import PIXI from 'pixi.js'

PIXI.utils.skipHello()
const [w, h] = [window.innerWidth, window.innerHeight]
const Ratio = window.devicePixelRatio
const W = w * Ratio
const H = h * Ratio
import { isBrowser } from '~/environment_es'

export default class Game {
  static getInstance () {
    if (!Game.instance) {
      Game.instance = new Game()
    }
    return Game.instance
  }
  print () {
  }
  constructor () {
    console.log('intid....a.df')
    this.app = new PIXI.Application(window.innerWidth * Ratio, window.innerHeight * Ratio, {
      transparent: true
    })
    this.isHaveLoad = false
    this.isLoadFirst = false
    // this.isLoadTouzi = false
  }

  /**
   * 加载资源
   * @param cb
   * @returns {boolean}
   */
  loadRes (cb) {
    if (this.isLoadFirst) {
      cb && cb()
      return false
    }

    this.isLoadFirst = true
    // 'assets/animation/6s/data.json',
    //   'assets/audio/6s.mp3'
    PIXI.loader.add([
      'assets/animation/6s/data.json',
      'assets/audio/6s.mp3'
    ]).load(() => {
      this.isHaveLoad = true
      cb && cb()
    })
  }

  /**
   * 初始化数据
   * @param d
   * @param cb
   */
  initData (d, cb) {
    if (!this.isHaveLoad) {
      this.loadRes(() => {
        cb && this.renderData(d, cb)
      })
    } else {
      cb && this.renderData(d, cb)
    }
  }

  /**
   * 渲染数据
   * @param d
   * @param cb
   */
  renderData (d, cb) {
    if (!d) {
      return false
    }
    // 初始化
  }

  init6s (data) {
    this.container && this.container.destory()
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)
    // this.happyMusic = this.loader.resources['assets/audio/6s.mp3']
    const frames = []
    for (let i = 0; i < 61; i++) {
      frames.push(new PIXI.Texture.fromFrame('6s_001' + (26 + i)))
    }
    const anim = new PIXI.extras.AnimatedSprite(frames)
    this.setSize(anim, W * 0.11)
    anim.x = W / 2
    anim.y = W / 2 - 50
    return this.container.addChild(anim)
    // anim.anchor.set(0.5)
    // anim.animationSpeed = 0.2
    // anim.play()
    // anim.width = worldWidth / 2
    // anim.height = worldHeight / 2
    // this.App.stage.addChild(anim)
    // this.happyMusic.sound.play()
  }

  setSize (sprite, len, size = 'width') {
    if (size === 'height') {
      const precent = len / sprite.height
      sprite.height = len
      sprite.width *= precent
    } else {
      const precent = len / sprite.width
      sprite.width = len
      sprite.height *= precent
    }
  }
}
// export default new Game()
// window.Emoji233333 = Emoji233333
// if (isBrowser) {
//   Window.Game = new Game
// }
Vue.prototype.Game = Game

// global.Game = exports; // eslint-disable-line
