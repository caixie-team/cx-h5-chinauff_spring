<template>
  <div>
    <div
      id="play12s"
      ref="play12s">
      <div class="topbar">
        <span class="timer">
          {{ time }} 秒
        </span>
        <span
          class="jump"
          @click="jump">
          跳过
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  // import {mapState} from 'vuex'
  import EventBus from '../../utils/event-bus.js'
  import bgLightImg from '~/assets/img/bg/page_bgr.jpg'

  const path12s = 'assets/animation/12s'

  export default {
    data () {
      return {
        loader: null,
        app: null,
        game: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
        time: 12,
        allTexture: {},
        objSprites: {
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
    },
    mounted () {
      // 初始化动化资源
      const [w, h] = [window.innerWidth, window.innerHeight]
      const Ratio = window.devicePixelRatio
      // console.log(Ratio)
      this.W = w * Ratio
      this.H = h * Ratio
      this.worldWidth = 640
      this.worldHeight = 1136

      this.app = new PIXI.Application(
        window.innerWidth * Ratio,
        window.innerHeight * Ratio,
        {
          backgroundColor: 0xD40E25,
          transparent: true
        })
      this.isHaveLoad = false
      this.isLoadFirst = false
      const viewport = new PIXI.extras.Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: this.worldWidth,
        worldHeight: this.worldHeight
      })
      viewport.fitWidth(this.worldWidth, false, false)
        .fitHeight(this.worldHeight, false, false)
      // 添加背景容器
      const bg = viewport.addChild(new PIXI.Container())
      // 添加背景图
      bg.addChild(new PIXI.Sprite.fromImage(bgLightImg))
      // 添加背景
      viewport.addChild(bg)
      this.$refs.play12s.appendChild(this.app.view)
      this.loadRes((data) => {
        this.app.stage.addChild(viewport)
        this.init12s(data)
        // this.$store.dispatch('showLoading', {show: false})
      })
    },
    methods: {
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
      },
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
        this.loader = new PIXI.loaders.Loader()

        for (const obj in this.objSprites) {
          this.loader.add(this.objSprites[obj].json) // resource load for eatch objSprites
        }
        this.loader.add('assets/audio/12s.mp3')
        this.loader.load() // Start(callback)'added'↓↓↓

        // Loading process
        // this.loader.onLoad.add(function (loader, data) {
        //   // called once per loaded data (callback)
        //   const logTable = [
        //     {
        //       'Data': data,
        //       'Progress': loader.progress,
        //       'Named': data.name,
        //       'Ext': data.extension
        //     }
        //   ]
        //   // console.table(logTable)
        //   console.log('data: ', data, '|Progress:' + loader.progress, '|FileName:' + ((data.url).slice(32)), '|Named:' + data.name, '|Ext:' + data.extension);
        // })
        this.loader.onComplete.add((loader, data) => {
          this.isHaveLoad = true
          cb && cb(data)
        })
        // PIXI.loader.add([
        //   'assets/animation/6s/data.json',
        //   'assets/audio/6s.mp3'
        // ]).load(() => {
        //   this.isHaveLoad = true
        //   cb && cb()
        // })
      },
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
      },
      jump () {
        if (this.happyMusic) {
          this.happyMusic.sound.stop()
        }
        setTimeout(() => {
          EventBus.$emit('show12s', false)
          // this.$router.push('/page23')
          // this.dialog.hide()
        }, 1000)
        EventBus.$emit('show6s', true)

      },
      timer () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000);
          // this.happyMusic.sound.stop()
        } else {
          setTimeout(() => {
            EventBus.$emit('show12s', false)
            // this.dialog.hide()
            // this.$store.commit('ai/RESET_SCORE')
            // EventBus.$emit('show12s', true)
            // this.$router.push('/page22')
          }, 1000)
          EventBus.$emit('show6s', true)
        }
      },
      init12s (data) {
        this.container && this.container.destory()
        this.container = new PIXI.Container()
        this.app.stage.addChild(this.container)

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
          // console.log(data[resourceName].extension)
          if (data[resourceName].extension === 'json') {
            Object.assign(this.allTexture, data[resourceName].textures)
          }
        }
        // 处理纹理
        for (const obj in this.objSprites) { // we have allTexture , now build with objSprites ani
          for (const aniType in this.objSprites[obj].ani) {
            const frames = []
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

        // 舞龙
        this.objSprites.dragon.ani.dance.texture.zIndex = 100
        this.objSprites.dragon.ani.dance.texture.anchor.set(0.5)
        this.objSprites.dragon.ani.dance.texture.animationSpeed = 0.178
        // 山背景
        this.objSprites.mountain.ani.parallax.texture.zIndex = 1
        this.objSprites.mountain.ani.parallax.texture.anchor.set(0.5)
        this.objSprites.mountain.ani.parallax.texture.animationSpeed = 0.18

        // 烟花
        this.objSprites.fire.ani.fireworks.texture.zIndex = 2
        this.objSprites.fire.ani.fireworks.texture.anchor.set(0.5)
        this.objSprites.fire.ani.fireworks.texture.animationSpeed = 0.18

        // 灯笼
        this.objSprites.lantern.ani.shake.texture.zIndex = 1
        this.objSprites.lantern.ani.shake.texture.anchor.set(0.5)
        this.objSprites.lantern.ani.shake.texture.animationSpeed = 0.18

        this.container.addChild(this.objSprites.mountain.ani.parallax.texture)
        this.container.addChild(this.objSprites.dragon.ani.dance.texture)
        this.container.addChild(this.objSprites.fire.ani.fireworks.texture)
        this.container.addChild(this.objSprites.lantern.ani.shake.texture)
        this.happyMusic = this.loader.resources['assets/audio/12s.mp3']

        EventBus.$on('show12s', (e) => {
          if (e === true) {
            // this.happyMusic = this.loader.resources['assets/audio/12s.mp3']
            this.timer()
            this.objSprites.dragon.ani.dance.texture.play()
            this.objSprites.mountain.ani.parallax.texture.play()
            this.objSprites.fire.ani.fireworks.texture.play()
            this.objSprites.lantern.ani.shake.texture.play()
            this.happyMusic.sound.play()
          }
          if (e === false) {
            this.objSprites.dragon.ani.dance.texture.stop()
            this.objSprites.mountain.ani.parallax.texture.stop()
            this.objSprites.fire.ani.fireworks.texture.stop()
            this.objSprites.lantern.ani.shake.texture.stop()
            this.happyMusic.sound.stop()
          }
        })
        // this.happyMusic.sound.play()
        // this.app.stage.addChild(this.objSprites.mountain.ani.parallax.texture)
        // this.app.stage.addChild(this.objSprites.dragon.ani.dance.texture)
        // this.app.stage.addChild(this.objSprites.fire.ani.fireworks.texture)
        // this.app.stage.addChild(this.objSprites.lantern.ani.shake.texture)
        // this.happyMusic = this.loader.resources['assets/audio/12s.mp3']
        // this.timer()
        // this.happyMusic.sound.play()
        // this.app.ticker.add(() => {
        //   this.app.renderer.render(this.app.stage)
        // })
        // this.$refs.play12s.appendChild(this.app.view)

      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #play12s
    /*position: absolute*/
    z-index: 999
    background: #D40E25
    position: fixed
    top: 0
    left: 0
    /*z-index: 0*/

  .topbar
    position: absolute
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 20px
    width: 600px
    span
      display: flex
      font-size: 20px
      /*justify-items: center*/
      justify-content: center
      flex-direction: column
      text-align: center
      opacity: 0.5
      background: #000;
      width: 100px
      height: 40px
      border-radius: 100px
      /*text-align: center*/
      vertical-align: middle
      color: #fff
</style>
