<template>
  <div
    v-cloak
    id="app">
    <share-guide v-show="share"/>
    <nuxt/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import ShareGuide from '../components/share/share-guide'
  import EventBus from '../utils/event-bus.js'

  export default {
    ...mapState('option', [
      'mobileLayout'
    ]),
    components: {
      ShareGuide
    },
    data () {
      return {
        share: false
      }
    },
    mounted () {
      EventBus.$on('share', (e) => {
        this.share = e
      })
    }
  }
</script>

