/* eslint-disable  */

import * as PIXI from 'pixi.js'

PIXI.utils.skipHello()
import EventBus from '~/utils/event-bus.js'

const [w, h] = [window.innerWidth, window.innerHeight]
const Ratio = window.devicePixelRatio
const W = w * Ratio
const H = h * Ratio
const path12s = 'assets/animation/12s'
const path6s = 'assets/animation/6s'

export default class Game {
  constructor () {
    this.app = new PIXI.Application(window.innerWidth * Ratio, window.innerHeight * Ratio, {
      transparent: true,
    });
    // this.isHaveLoad = false
    this.isLoadFirst = false
    // this.isLoadTouzi = false
    this.play12sObj = {}
    this.play6sObj = {}
    this.allTexture = {}
    this.objSprites = {
      // 球
      ball: {
        ani: {
          rotate: {
            framesRange: [126, 186],
            texture: 'AnimatedSprite',
            viewport: ''
          }
        },
        json: [
          `${path6s}/data.json`
        ]
      },
      // 舞龙
      dragon: {
        ani: {
          dance: {
            framesRange: [0, 127],
            ref: 'dragon_12s_',
            texture: 'AnimatedSprite',
            viewport: ''
          }
        },
        json: [
          `${path12s}/dragon/data-0.json`,
          `${path12s}/dragon/data-1.json`,
          `${path12s}/dragon/data-2.json`,
          `${path12s}/dragon/data-3.json`,
          `${path12s}/dragon/data-4.json`,
        ]
      },
      // 烟火
      fire: {
        ani: {
          fireworks: {
            framesRange: [0, 127],
            ref: 'fire_12s_',
            texture: 'AnimatedSprite',
            viewport: ''
          }
        },
        json: [
          `${path12s}/fire/data-0.json`,
        ]
      },
      // 灯笼
      lantern: {
        ani: {
          shake: {
            framesRange: [0, 127],
            ref: 'lantern_12s_',
            texture: 'AnimatedSprite',
            viewport: ''
          }
        },
        json: [
          `${path12s}/lantern/data-0.json`,
          `${path12s}/lantern/data-1.json`,
          `${path12s}/lantern/data-2.json`,
          `${path12s}/lantern/data-3.json`,
          `${path12s}/lantern/data-4.json`,
          `${path12s}/lantern/data-5.json`,
          `${path12s}/lantern/data-6.json`,
          `${path12s}/lantern/data-7.json`,
          `${path12s}/lantern/data-8.json`,
          `${path12s}/lantern/data-9.json`,
          `${path12s}/lantern/data-10.json`,
          `${path12s}/lantern/data-11.json`,
          `${path12s}/lantern/data-12.json`,
          `${path12s}/lantern/data-13.json`,
          `${path12s}/lantern/data-14.json`,
        ]
      },
      // 山
      mountain: {
        ani: {
          parallax: {
            framesRange: [0, 127],
            ref: 'shan_12s_',
            texture: 'AnimatedSprite',
            viewport: ''
          }
        },
        json: [
          `${path12s}/mountain/data-0.json`,
          `${path12s}/mountain/data-1.json`,
          `${path12s}/mountain/data-2.json`,
          `${path12s}/mountain/data-3.json`,
        ]
      }
    }
  }

  loadRes (cb) {
    if (this.isLoadFirst) {
      cb && cb()
      return false
    }

    this.isLoadFirst = true
    this.loader = new PIXI.loaders.Loader()
    for (const obj in this.objSprites) {
      this.loader.add(this.objSprites[obj].json) // resource load for eatch objSprites
    }
    this.loader.add('assets/audio/12s.mp3')
    this.loader.add('assets/audio/6s.mp3')
    this.loader.add('assets/animation/bg_red.jpg')
    this.loader.add('assets/animation/bg_light.jpg')
    this.loader.add('assets/animation/btn_sxfq.jpg')
    // this.loader.load((data) => {
    //   this.isHaveLoad = true
    //   cb && cb(data)
    // }) // Start(callback)'added'↓↓↓
    this.loader.load() // Start(callback)'added'↓↓↓

    // Loading process
    // this.loader.onLoad.add(function (loader, data) {
    // called once per loaded data (callback)
    // const logTable = [
    //   {
    //     'Data': data,
    //     'Progress': loader.progress,
    //     'Named': data.name,
    //     'Ext': data.extension
    //   }
    // ]
    // console.table(logTable)
    // console.log('data: ', data, '|Progress:' + loader.progress, '|FileName:' + ((data.url).slice(32)), '|Named:' + data.name, '|Ext:' + data.extension);
    // })
    this.loader.onComplete.add((loader, data) => {
      this.isHaveLoad = true
      cb && cb(data)
    })
  }

  init (cb) {
    this.loadRes((data) => {
      cb && this.render(data, cb)
    })
  }

  // getInit () {
  //   this.container12s && this.container12s.destory()
  //   this.container6s && this.container6s.desctory()
  // }

  render (data, cb) {
    // if (!d) {
    //   return false
    // }
    // 初始化 6s 动画资源
    this.init6s(data)
    this.init12s(data)

    cb && cb(data)
  }

  // 初始化 12s 动画
  init12s (data) {
    this.container12s && this.container12s.destory()
    this.container12s = new PIXI.Container()
    this.app.stage.addChild(this.container12s)
    // let bgRed = this.loader.resources['assets/animation/bg_light.jpg']
    let bgRed = new PIXI.Sprite(this.loader.resources['assets/animation/bg_light.jpg'])
    this.container12s.addChild(bgRed)

    // called once when finish queued resources load. (callback)
    const val = function (i) {
      // 00099
      if (i < 10) {
        return '0000' + i
      } else if (i < 100 && i >= 10) {
        return '000' + i
      } else {
        return '00' + i
      }
      // return i < 10 ? '0000' + i : '00' + i;
    }; // return a number valur increment (callBack)↓↓↓
    for (const resourceName in data) { // apply loop setup only on .json, They hold the textures && compile all texture inside a variable
      if (data[resourceName].extension === 'json') {
        Object.assign(this.allTexture, data[resourceName].textures)
      }
    }
    // 处理纹理
    for (const obj in this.objSprites) { // we have allTexture , now build with objSprites ani
      for (const aniType in this.objSprites[obj].ani) {
        const frames = []
        // console.log(obj)
        // 排除球动画
        if (obj !== 'ball') {
          const ref = this.objSprites[obj].ani[aniType].ref
          const framesRange = this.objSprites[obj].ani[aniType].framesRange
          for (let i = framesRange[0]; i <= framesRange[1]; i++) {
            // console.log(allTexture[ref + val(i)])
            frames.push(this.allTexture[ref + val(i)])
          }
          this.objSprites[obj].ani[aniType].texture = new PIXI.extras.AnimatedSprite(frames)
          this.objSprites[obj].ani[aniType].texture.anchor.set(0.5)
          this.objSprites[obj].ani[aniType].texture.x = window.innerWidth / 2
          this.objSprites[obj].ani[aniType].texture.y = window.innerHeight / 2
          this.objSprites[obj].ani[aniType].texture.width = window.innerWidth
          this.objSprites[obj].ani[aniType].texture.height = window.innerHeight
        }

      }
    }
    // 舞龙
    this.play12sObj.dragonTexture = this.objSprites.dragon.ani.dance.texture
    this.play12sObj.dragonTexture.zIndex = 100
    // dragonTexture.anchor.set(.5)
    this.play12sObj.dragonTexture.animationSpeed = 0.178
    // 山
    this.play12sObj.mountainTexture = this.objSprites.mountain.ani.parallax.texture
    this.play12sObj.mountainTexture.zIndex = 1
    // mountainTexture.anchor.set(.5)
    this.play12sObj.mountainTexture.animationSpeed = 0.18
    // 烟花
    this.play12sObj.fireTexture = this.objSprites.fire.ani.fireworks.texture
    this.play12sObj.fireTexture.zIndex = 2
    // fireTexture.anchor.set(.5)
    this.play12sObj.fireTexture.animationSpeed = 0.18

    // 灯笼
    this.play12sObj.lanternTexture = this.objSprites.lantern.ani.shake.texture
    this.play12sObj.lanternTexture.zIndex = 1
    // lanternTexture.anchor.set(.5)
    this.play12sObj.lanternTexture.animationSpeed = 0.18

    // this.play12sObj.audio = this.loader.resources['assets/audio/12s.mp3']
    const audio = this.loader.resources['assets/audio/12s.mp3']
    this.play12sObj.sound = audio.sound
    this.container12s.addChild(this.play12sObj.mountainTexture)
    this.container12s.addChild(this.play12sObj.fireTexture)
    this.container12s.addChild(this.play12sObj.lanternTexture)
    this.container12s.addChild(this.play12sObj.dragonTexture)
    this.container12s.visible = false
  }

  // 初始化 6s 动画
  init6s () {
    this.container6s && this.container6s.destory()
    this.container6s = new PIXI.Container()
    this.app.stage.addChild(this.container6s)
    let bgSprite = new PIXI.Sprite(this.loader.resources['assets/animation/bg_light.jpg'].texture)
    // let bgSprite = this.loader.resources['assets/animation/bg_light.jpg']
    bgSprite.x = window.innerWidth / 2
    bgSprite.y = window.innerHeight / 2
    bgSprite.width = window.innerWidth
    bgSprite.height = window.innerHeight
    bgSprite.anchor.set(0.5)
    this.container6s.addChild(bgSprite)
    bgSprite.zIndex = 1

    const frames = []
    for (let i = 0; i < 61; i++) {
      frames.push(new PIXI.Texture.fromFrame('6s_001' + (26 + i)))
    }
    this.play6sObj.sprite = new PIXI.extras.AnimatedSprite(frames)
    this.play6sObj.sprite.x = window.innerWidth / 2
    this.play6sObj.sprite.y = window.innerHeight / 2 - 50
    this.container6s.addChild(this.play6sObj.sprite)
    this.play6sObj.sprite.anchor.set(0.5)
    this.play6sObj.sprite.animationSpeed = 0.3
    this.setSize(this.play6sObj.sprite, W * .3)
    this.play6sObj.sprite.zIndex = 2
    const button = new PIXI.Sprite(this.loader.resources['assets/animation/btn_sxfq.jpg'].texture)
    button.x = window.innerWidth / 2
    button.y = H * .8
    button.anchor.set(0.5)
    button.width = 248 / 2
    button.height = 60 / 2
    button.interactive = true
    button.buttonMode = true
    button
      .on('touchstart', this._onButtonDown)
      .on('touchend', this.onButtonUp)
    // .on('touchendoutside', this.onButtonUp)
    // this.setSize(button, W * .1)
    this.container6s.addChild(button)
    button.zIndex = 100

    this.container6s.visible = false
    // sprite.play()
    const audio = this.loader.resources['assets/audio/6s.mp3']
    this.play6sObj.sound = audio.sound
  }

  _onButtonDown () {
    if (this.isdown) {
      return
    }
    this.isdown = true
    this.alpha = 1
    // this.alpha = .6
    EventBus.$emit('getLucky', true)
  }

  onButtonUp () {
    this.isdown = false
    // this.alpha = 1
  }

  setSize (sprite, len, size = 'width') {
    if (size === 'height') {
      let precent = len / sprite.height
      sprite.height = len
      sprite.width = sprite.width * precent
    } else {
      let precent = len / sprite.width
      sprite.width = len
      sprite.height = sprite.height * precent
    }
  }

  stop6s () {
    this.container6s.visible = false
    this.play6sObj.sprite.stop()
    this.play6sObj.sound.stop()
  }

  play6s () {
    this.container6s.visible = true
    this.play6sObj.sprite.play()
    this.play6sObj.sound.play()
  }

  stop12s () {
    this.container12s.visible = false
    this.play12sObj.dragonTexture.stop()
    this.play12sObj.mountainTexture.stop()
    this.play12sObj.fireTexture.stop()
    this.play12sObj.lanternTexture.stop()
    this.play12sObj.sound.stop()
  }

  play12s () {
    this.container12s.visible = true
    this.play12sObj.dragonTexture.play()
    this.play12sObj.mountainTexture.play()
    this.play12sObj.fireTexture.play()
    this.play12sObj.lanternTexture.play()
    this.play12sObj.sound.play()
  }
}
