<template>
  <div
    ref="bgRenderer"
    class="pixibackground">
    <span
      class="c-btn">
      收下福气
    </span>
  </div>
</template>

<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI */
  // import Viewport from 'pixi-viewport/bundle/pixi-viewport.min'
  import Slider from './class/slide'
  // import {mapGetters} from 'vuex'
  // import Shader from './Class/Shader/Glitch'
  import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'
  import {Picker} from "../../modules/module";
  // import animationJson from '~/static/assets/animation/6s/data.json'
  export default {
    name: 'Pixibackground',
    data: function () {
      return {
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
      currentImage () {
        return this.$store.getters['pixiStore/currentImage']
      },
      slides () {
        return this.$store.getters['pixiStore/slides']
      }
    },
    watch: {
      currentImage () {
        this.changeImage(this.currentImage)
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // this.uniforms.iTime = { type: 'f', value: 0.1 }
        // this.uniforms.resolution = { type: 'v2', value: {x: window.width, y: window.height} }
        // this.$bus.$on('changeImage', this.changeImage)
        this.App = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          antialias: true,
          autoResize: true,
          sharedTicker: true,
          backgroundColor: 0xFFFFFF
        })
        const worldWidth = 640
        const worldHeight = 1136
        const viewport = new PIXI.extras.Viewport({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          worldWidth: worldWidth,
          worldHeight: worldHeight
        })
        viewport.fitWidth(worldWidth, false, false)
          .fitHeight(worldHeight, false, false)
        this.App.stage.addChild(viewport)
        // this.App.renderer.view.style.objectFit = 'cover'
        // this.App.renderer = PIXI.autoDetectRenderer(640, 1338);
        // this.App.renderer.view.style.width = '100%'
        // this.App.renderer.view.style.height = '100%'
        // this.App.renderer.view.style.top = '50%'
        // this.App.renderer.view.style.left = '50%'
        // this.App.renderer.view.style.webkitTransform = 'scale(1.1)'
        // this.App.renderer.view.style.transform = 'scale(1.1)'

        // const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
        // const bgContainer = new PIXI.Container()
        // 添加背景容器
        const bg = viewport.addChild(new PIXI.Container())
        // 添加背景图
        bg.addChild(new PIXI.Sprite.fromImage(bgLightImg))
        // 添加背景
        viewport.addChild(bg)

        this.loader = new PIXI.loaders.Loader()
        // this.loader.add('/assets/animation/6s/data.webp')
        this.loader.add('assets/animation/6s/data.json').load(() => {
          const sheet = this.loader.resources['assets/animation/6s/data.json'].spritesheet
          console.log(sheet)
          // console.log(sheet.animations['6s'])
          const frames = []
          for (let i = 0; i < 61; i++) {
            frames.push(new PIXI.Texture.fromFrame('6s_001' + (26 + i)))
          }
          const anim = new PIXI.extras.AnimatedSprite(frames)
          anim.x = window.innerWidth / 2
          anim.y = window.innerHeight / 2 - 50
          // anim.x = 0
          // anim.y = 0
          anim.anchor.set(0.5)
          anim.animationSpeed = 0.2
          anim.play()
          anim.width = worldWidth / 2
          anim.height = worldHeight / 2
          this.App.stage.addChild(anim)
        })

        this.$refs.bgRenderer.appendChild(this.App.view)

      },
      changeImage (newImage) {
        this.Slide.changeImage(newImage)
      },
      setup () {
        this.Slide = Slider()
        this.App.stage.addChild(this.Slide)
        this.Slide.x = 0
        this.Slide.y = 0
        this.Slide.loadSlides(this.slides)
        this.Slide.addShader()
        this.App.ticker.add(() => {
          this.App.renderer.render(this.App.stage)
        })
      }
    }
  }
</script>

<style>
  .pixibackground {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .c-btn{
    position: absolute;
    z-index: 100;
  }
</style>
