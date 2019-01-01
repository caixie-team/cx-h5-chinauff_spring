<template>
  <div
    v-cloak
    id="app">
    <!--<share-guide v-show="share"/>-->
    <!--<transition-->
    <!--name="bounce">-->
    <!--<play12s v-show="isShow12s"/>-->
    <!--</transition>-->
    <!--<transition-->
    <!--name="bounce">-->
    <!--<play6s v-show="isShow6s"/>-->
    <!--</transition>-->
    <nuxt/>

  </div>
</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  // import {mapState} from 'vuex'
  import ShareGuide from '../components/share/share-guide'
  import Play12s from '../components/game/play12s'
  import Play6s from '../components/game/play6s'

  import EventBus from '../utils/event-bus.js'
  // import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'
  export default {
    // ...mapState('option', [
    //   'mobileLayout'
    // ]),
    components: {
      ShareGuide,
      Play12s,
      Play6s
    },
    data () {
      return {
        app: null,
        game: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
        share: false,
        isShow12s: false,
        isShow6s: false
      }
    },
    mounted () {
      EventBus.$on('share', (e) => {
        this.share = e
      })
      EventBus.$on('show12s', (e) => {
        this.isShow12s = e
      })
      EventBus.$on('show6s', (e) => {
        this.isShow6s = e
      })
    }
  }
</script>

