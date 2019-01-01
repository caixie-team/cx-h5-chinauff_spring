<template>
  <div class="error">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16">
            <path
              fill="rgba(255, 255, 255, .7)"
              d="M7.32283581,2.38084737 L1.1033431,12.8646462 C0.964872768,13.0994562 0.965601127,13.3882972 1.105254,13.6224431 C1.24490688,13.8565891 1.50228569,14.0004977 1.78050731,13.9999987 L14.2194927,13.9999987 C14.4977143,14.0004977 14.7550931,13.8565891 14.894746,13.6224431 C15.0343989,13.3882972 15.0351272,13.0994562 14.8966569,12.8646462 L8.67195525,2.38084737 C8.52724559,2.13540038 8.25409089,1.98880958 7.96353732,2.00066887 C7.69718271,2.01236651 7.4554747,2.15579084 7.32283581,2.38084737 Z M8.00000001,5.33381373 C8.36823065,5.33381373 8.66674629,5.63228019 8.66674629,6.0004427 L8.50005972,9.00028141 C8.50005972,9.27639913 8.27617299,9.50025314 8.00000001,9.50025314 C7.72382536,9.50025314 7.49994029,9.27639913 7.49994029,9.00028141 L7.33325372,6.0004427 C7.33325372,5.63228019 7.6317677,5.33381373 8.00000001,5.33381373 Z M8.00000001,10.3335394 C8.46029164,10.3335394 8.83343287,10.7066183 8.83343287,11.1668256 C8.83343287,11.6270329 8.46029164,12.0001118 8.00000001,12.0001118 C7.53970838,12.0001118 7.16656715,11.6270329 7.16656715,11.1668256 C7.16656715,10.7066183 7.53970838,10.3335394 8.00000001,10.3335394 Z"/>
            找不到本页面
          </svg>
        </h2>
      </div>
      <p class="error-link">
        <nuxt-link
          class="link"
          to="/spring">返回首页
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
  /* eslint-disable vue/require-prop-types */

  export default {
    layout: 'empty',
    props: [
      'error'
    ],
    mounted () {
      // this.$store.commit('option/SET_ERROR_COLUMU', true)
    },
    beforeDestroy () {
      // this.$store.commit('option/SET_ERROR_COLUMU', false)
    }
  }
</script>

<style lang="scss" scoped>
  .error {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: rgba(255, 255, 255, .7);
    overflow: hidden;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(14, 30, 37);

    @keyframes error-item {
      0% {
        opacity: 0;
        transform: translate3d(0, -30%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    > .error-content {

      > .error-code,
      > .error-link,
      > .error-wrapper-message {
        color: #fff;
        animation: error-item ease-out both .5s .3s;
      }

      .link {

        &:hover {
          border-bottom: 1px solid;
        }
      }

      > .error-code {
        text-transform: uppercase;
        font-size: 12rem;
        margin: 0;
      }

      > .error-wrapper-message {

        > .error-message {
          margin-top: 0;
        }
      }
    }
  }
</style>
