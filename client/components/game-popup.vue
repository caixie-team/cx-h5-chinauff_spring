<template>
  <div class="myprize popup">
    <div class="mask"/>
    <div class="box">
      <div class="mask2"/>
      <div class="wrap">
        <img
          src="~assets/img/btn/btn_close_r.png"
          class="btn_close">
        <img
          src="~assets/img/bg/popup_bg6.png"
          alt=""
          class="bg">
        <div class="tabtitle">
          <ul>
            <li class="rule active"><img src="~assets/img/btn/btn_prizelist2.png"><img
              src="~assets/img/btn/btn_prizelist.png"
              class="activeimg"></li>
            <li class="hongbao"><img src="~assets/img/btn/mycard2.png"><img
              src="~assets/img/btn/mycard.png"
              class="activeimg"></li>
          </ul>
        </div>
        <div class="tab1">
          <div class="tab1box scroll"/>
          <img
            src="~assets/img/see_more.png"
            class="see-more">
        </div>
        <div class="tab2">
          <div class="noshuo">
            <p>您还有一段圣诞真心说，</br> 等着发给TA~</p>
            <img
              src="~assets/img/btn/btn_wantsay.png"
              class="btn_wantsay">
          </div>
          <div class="showshuo">
            <div class="giftbox zxs">
              <img
                src="~assets/img/carddemo.png"
                class="giftimg">
              <p class="giftintro">圣诞真心说</p>
            </div>
            <div class="giftbox mxp">
              <img
                src="~assets/img/giftcard1.png"
                class="giftimg">
              <p class="giftintro">心意明信片</p>
            </div>
          </div>
        </div>
        <p class="urltip"/>
      </div>
    </div>
  </div><!--我的奖品页结束-->

</template>
<script>
  export default {}
</script>
<style scoped lang="scss">
  .game.popup {
    display: none;

    .box {
      .wrap {
        .btn_close {
          top: 5%;
        }

        .tabtitle {
          width: 75%;
          position: absolute;
          top: 16%;
          left: 12.5%;
          //              border-bottom: solid 1px #77bc86;
          ul {
            margin: 0;
            padding: 0;
            overflow: hidden;

            li {
              list-style-type: none;
              display: inline-block;
              float: left;
              width: 45%;
              position: relative;

              img {
                width: 100%;
              }

              .activeimg {
                display: none;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0%;
                left: 0%;
              }
            }

            li:nth-child(1) {
              margin-right: 10%;
            }
          }

          .active {
            .activeimg {
              display: block;
            }
          }

        }

        .tab1 {
          display: none;
          position: absolute;
          width: 75%;
          left: 12.5%;
          top: 26%;
          height: 60%;
          //              overflow: scroll;
          .tab1box {
            position: absolute;
            width: 100%;
            left: 0%;
            top: 0%;
            height: 100%;
            overflow: scroll;
          }

          .giftbox {
            //                  display: none;
            $mackets-popup-bg-width: 100%;
            position: relative;
            width: $mackets-popup-bg-width;
            top: 0;
            float: left; //      left: (100%-$mackets-popup-bg-width)/2;
            background: #FFFFFF;
            border-radius: 5px;
            margin-bottom: 3%;

            .giftimg {
              position: absolute;
              height: 55%;
              top: 22.5%;
              left: 5%;
            }

            .typeimg {
              position: absolute;
              width: 25%;
              top: 12%;
              left: 0%;
            }

            .giftintro {
              width: 45%;
              margin-left: 55%;
              text-align: left;
              font-size: 0.5rem;
              color: $main-font-color-g;
              line-height: 0.9rem;
              padding: 4% 0;

              span {
                font-size: 0.8rem;
                color: $main-font-color-r;
              }

              :before {
                content: ' ';
                position: absolute;
                width: 1px;
                height: 60%;
                top: 20%;
                left: 50%;
                background: #eaeaea;
              }

              .status1 {
                //                      position: absolute;
                width: 55%;
                text-align: center;
                background: none;
                border: 1px solid $main-font-color-r;
                border-radius: 3px;
                color: $main-font-color-r;
                padding: 4% 0%;
              }

              .status0, .status2 {
                width: 55%;
                text-align: center;
                background: none;
                border: 1px solid #dacec0;
                border-radius: 3px;
                color: #dacec0;
                padding: 4% 0%;
              }

              img {
                width: 55%;

              }
            }

          }

          .award2, .award4 {
            .giftimg {
              height: 75%;
              top: 17.5%;
              left: 10%;
            }
          }

          .award7, .award3, .award2, .award1 {
            .giftintro {
              padding: 8% 0;
            }
          }
        }

        .tab2 {
          display: none;
          position: absolute;
          width: 75%;
          left: 12.5%;
          top: 26%;
          height: 60%;

          .noshuo {
            display: none;

            p {
              width: 80%;
              position: absolute;
              left: 10%;
              top: 20%;
              font-size: .6rem;
              color: #FFFFFF;
            }

            .btn_wantsay {
              position: absolute;
              width: 50%;
              top: 50%;
              left: 25%;
            }
          }

          .showshuo {
            display: none;

            .giftbox {
              display: none;
              $mackets-popup-bg-width: 100%;
              position: relative;
              width: $mackets-popup-bg-width;
              top: 0;
              float: left; //      left: (100%-$mackets-popup-bg-width)/2;
              background: #FFFFFF;
              border-radius: 5px;
              margin-bottom: 3%;

              .giftimg {
                position: absolute;
                height: 55%;
                top: 22.5%;
                left: 12%;
              }

              .giftintro {
                width: 40%;
                margin-left: 60%;
                text-align: left;
                font-size: 0.8rem;
                color: $main-font-color-r;
                line-height: 0.9rem;
                padding: 13% 0;

              }

              .giftintro:before {
                content: ' ';
                position: absolute;
                width: 1px;
                height: 60%;
                top: 20%;
                left: 50%;
                background: #eaeaea;
              }

            }
          }
        }

        .see-more {
          display: none;
          bottom: -7%;
        }

        .urltip {
          position: absolute;
          width: 70%;
          left: 15%;
          bottom: -4%;
          color: #FFFFFF;
          font-size: .6rem;
          text-decoration: underline;
        }
      }
    }
  }
</style>

