<template>
  <div>
    <div
      ref="bgRenderer"
      class="pixibackground">
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
  /* global PIXI */

  const path12s = 'assets/animation/12s'
  export default {
    name: 'Pixibackground',
    data: function () {
      return {
        time: 12,
        ticker: null,
        loader: null,
        stage: null,
        renderer: null,
        Slide: null,
        uniforms: {},
        App: null
      }
    },
    computed: {
      // currentImage () {
      //   return this.$store.getters['pixiStore/currentImage']
      // },
      // slides () {
      //   return this.$store.getters['pixiStore/slides']
      // }
    },
    watch: {
      // currentImage () {
      //   this.changeImage(this.currentImage)
      // }
    },
    mounted () {
      this.init()
    },
    methods: {
      jump () {
        if (this.happyMusic) {
          this.happyMusic.sound.stop()
        }
        setTimeout(() => {
          this.$router.push('/page23')
          // this.dialog.hide()
        }, 1000)

      },
      timer () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000);
          this.happyMusic.sound.stop()
        } else {
          this.happyMusic.sound.stop()
        }
      },
      init () {
        this.App = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          antialias: true,
          autoResize: true,
          sharedTicker: true,
          backgroundColor: 0xD40E25
        })
        const worldWidth = 640
        const worldHeight = 1136
        const viewport = new PIXI.extras.Viewport({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          worldWidth: worldWidth,
          worldHeight: worldHeight
        })

        this.App.stage.addChild(viewport)
        // viewport.fitWidth(worldWidth, true, true)
        // .fitHeight(worldHeight, true, true)
        // .fitWorld(true)
        // viewport.fit(true)
        this.loader = new PIXI.loaders.Loader()
        // * const loader = new PIXI.loaders.Loader();

        const objSprites = {
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
        for (const obj in objSprites) {
          this.loader.add(objSprites[obj].json) // resource load for eatch objSprites
        }
        // this.happyMusic = this.loader.resources['assets/audio/12s.mp3']

        this.loader.add('assets/audio/12s.mp3')
        this.loader.load() // Start(callback)'added'↓↓↓

        this.loader.onLoad.add(function (loader, data) {
          // called once per loaded data (callback)
          const logTable = [
            {
              'Data': data,
              'Progress': loader.progress,
              'Named': data.name,
              'Ext': data.extension
            }
          ]
          // console.table(logTable)
          console.log('data: ', data, '|Progress:' + loader.progress, '|FileName:' + ((data.url).slice(32)), '|Named:' + data.name, '|Ext:' + data.extension);
        })
        const allTexture = {}
        this.loader.onComplete.add((loader, data) => {
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
              Object.assign(allTexture, data[resourceName].textures)
            }
          }
          for (const obj in objSprites) { // we have allTexture , now build with objSprites ani
            for (const aniType in objSprites[obj].ani) {
              const frames = []
              const ref = objSprites[obj].ani[aniType].ref
              const framesRange = objSprites[obj].ani[aniType].framesRange
              for (let i = framesRange[0]; i <= framesRange[1]; i++) {
                // console.log(allTexture[ref + val(i)])
                frames.push(allTexture[ref + val(i)])
              }
              objSprites[obj].ani[aniType].texture = new PIXI.extras.AnimatedSprite(frames)
              // console.log(sprite)
              // objSprites[obj].ani[aniType].viewport.anchor.set(0.5)
              // objSprites[obj].ani[aniType].viewport.x = window.innerWidth / 2
              // objSprites[obj].ani[aniType].viewport.y = window.innerHeight / 2
              // objSprites[obj].ani[aniType].viewport.width = worldWidth
              // objSprites[obj].ani[aniType].viewport.height = worldHeight
              objSprites[obj].ani[aniType].texture.anchor.set(0.5)
              objSprites[obj].ani[aniType].texture.x = window.innerWidth / 2
              objSprites[obj].ani[aniType].texture.y = window.innerHeight / 2
              objSprites[obj].ani[aniType].texture.width = window.innerWidth
              objSprites[obj].ani[aniType].texture.height = window.innerHeight
            }
          }
          objSprites.dragon.ani.dance.texture.zIndex = 100
          objSprites.dragon.ani.dance.texture.anchor.set(0.5)
          objSprites.dragon.ani.dance.texture.animationSpeed = 0.178
          objSprites.dragon.ani.dance.texture.play()

          objSprites.mountain.ani.parallax.texture.zIndex = 1
          objSprites.mountain.ani.parallax.texture.anchor.set(0.5)
          objSprites.mountain.ani.parallax.texture.animationSpeed = 0.18
          objSprites.mountain.ani.parallax.texture.play()
          //
          objSprites.fire.ani.fireworks.texture.zIndex = 2
          objSprites.fire.ani.fireworks.texture.anchor.set(0.5)
          objSprites.fire.ani.fireworks.texture.animationSpeed = 0.18
          objSprites.fire.ani.fireworks.texture.play()
          //
          objSprites.lantern.ani.shake.texture.zIndex = 1
          objSprites.lantern.ani.shake.texture.anchor.set(0.5)
          objSprites.lantern.ani.shake.texture.animationSpeed = 0.18
          objSprites.lantern.ani.shake.texture.play()

          this.App.stage.addChild(objSprites.mountain.ani.parallax.texture)
          this.App.stage.addChild(objSprites.dragon.ani.dance.texture)
          this.App.stage.addChild(objSprites.fire.ani.fireworks.texture)
          this.App.stage.addChild(objSprites.lantern.ani.shake.texture)
          this.App.ticker.add(() => {
            this.App.renderer.render(this.App.stage)
          })
          this.happyMusic = this.loader.resources['assets/audio/12s.mp3']
          this.timer()
          this.happyMusic.sound.play()
        })
        this.$refs.bgRenderer.appendChild(this.App.view)

      },
      playDragon () {
      },
      playFire () {
      },
      playLantern () {
      },
      playMountain () {
      },
      setup () {
        // this.Slide = Slider()
        // this.App.stage.addChild(this.Slide)
        // this.Slide.x = 0
        // this.Slide.y = 0
        // this.Slide.loadSlides(this.slides)
        // this.Slide.addShader()
        // this.App.ticker.add(() => {
        //   this.App.renderer.render(this.App.stage)
        // })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pixibackground
    background: #D40E25
    position: fixed
    top: 0
    left: 0
    z-index: 0

  .topbar
    display: flex
    flex-direction: row
    justify-content: space-between

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
      text-align: center
      vertical-align: middle
      color: #fff

    .jump
      position: absolute;
      top: 20px
      right: 20px

    .timer
      position: absolute;
      top: 20px
      left: 20px
</style>
