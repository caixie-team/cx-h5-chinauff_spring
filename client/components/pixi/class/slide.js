/* eslint-disable no-undef,new-cap,no-tabs */
import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'
export default () => {
  const container = new PIXI.Container()
  const spriteBG = new PIXI.Sprite.fromImage(bgLightImg)
  // let currentSprite = spriteBG
  // let shader = null
  // let displacementSprite = null
  // let slidesArray = []

  container.interactive = true
  container.addChild(spriteBG)

  container.loadSlides = function loadSlides (slides) {
    // for (let i = 0; i < slides.length; i++) {
    //   let slide = new PIXI.Sprite.fromImage(slides[i], true)
    //   slidesArray.push(slide)
    //   slide.alpha = 0
    //   container.addChild(slide)
    // }
    // let graphics = new PIXI.Graphics()
    // graphics.beginFill(0x000000, 0.2)
    // graphics.drawRect(0, 0, window.innerWidth, window.innerHeight)
    // container.addChild(graphics)
  }
  container.addShader = function addShader () {
    // displacementSprite = new PIXI.Sprite.fromImage('clouds.jpg')
    // displacementSprite.anchor.set(0.5)
    // displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    // displacementSprite.x = window.innerWidth / 2
    // displacementSprite.y = window.innerHeight / 2
    // displacementSprite.scale.x = 2
    // displacementSprite.scale.y = 2
    // shader = new PIXI.filters.DisplacementFilter(displacementSprite)
    // container.filters = [shader]
    // let ticker = new PIXI.ticker.Ticker()
    // container.addChild(displacementSprite)
    //
    // ticker.autoStart = true
    // ticker.add((delta) => {
    //   displacementSprite.x += 0.5 * delta
    //   displacementSprite.y += 0.5
    // })
    // container.on('pointerdown', (event) => {
    //   TweenMax.to(shader.scale, 1, {
    //     x: '+=' + Math.sin(event.data.global.x) * 1200 + '',
    //     y: '+=' + Math.cos(event.data.global.y) * 200 + ''
    //   })
    // })
    // container.on('pointerup', () => {
    //   TweenMax.to(shader.scale, 1, {x: 20, y: 20})
    // })
  }
  container.changeImage = function changeImage (index) {
    // TweenMax.to(currentSprite, 0.5, {alpha: 0})
    // TweenMax.to(slidesArray[index], 0.5, {alpha: 1})
    // currentSprite = slidesArray[index]
  }
  return container
}
