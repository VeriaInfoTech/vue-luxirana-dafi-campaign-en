<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      miniVariant: false,
      right: true,
      rightDrawer: false,
      sidePaddingBuilder: window.innerWidth > this.$store.state.setting.maxWidth
        ? ((window.innerWidth - this.$store.state.setting.maxWidth) / 2)
        : 0,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      heightCalculator: null,
      paddingBuilder: null,
      ratio: null,
      maxWidth: null
    }
  },
  methods: {
    spacer(height) {
      return `<div style="height: ${this.ratio * height}px"> </div>`;
    },
    myEventHandler(e) {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.sidePaddingBuilder = this.windowWidth  > this.$store.state.setting.maxWidth
        ? ((this.windowWidth  - this.$store.state.setting.maxWidth) / 2)
        : 0;
      this.initialze();
    },
    initialze() {
      this.heightCalculator = this.windowWidth / this.windowHeight < 0.8
        ? this.windowHeight
        : (this.windowWidth > this.$store.state.setting.maxWidth ? 1920 : this.windowWidth / 0.8);

      this.paddingBuilder = this.windowWidth > this.$store.state.setting.maxWidth
        ? ((this.heightCalculator > this.windowHeight
          ? 0
          : ((this.windowHeight - (this.heightCalculator)) / 2)))
        : 0;

      this.ratio = (window.innerWidth > 1024
          ? 1024
          : window.innerWidth) /
        1024;
      this.maxWidth = this.$store.state.setting.maxWidth;
    }
  },
  created() {
    this.$parent.$emit('set-assets', this.assets)
    this.initialze()
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
}
</script>

<template>
  <div>
    <div
      :style="`
              padding-top: ${paddingBuilder}px;
              padding-right: ${sidePaddingBuilder}px;
              padding-bottom:${paddingBuilder}px;
              padding-left: ${sidePaddingBuilder}px;
              background-color:rgba(43, 52, 69, 1.0);
              overflow-x:hidden;
            `"
    >
      <div
        :style="`
              background-color: white;
              height:${windowHeight-(2*paddingBuilder)}px;
              overflow:scroll;
              overflow-x:hidden;
              width: ${ratio * maxWidth}px;
              box-sizing: content-box;
              `"
      >

        <div
          :style='`
              margin:0px auto;
              background-size: cover;
              width: ${ratio * maxWidth}px;
              background-image: url(${require("~/assets/images/first-page/app-bar.png")});
              height: ${ratio * 146}px;
              position:${sidePaddingBuilder==0?"fixed":"relative"};
            `'
        >

        </div>

        <div v-if="paddingBuilder==0" v-html="spacer(146)"></div>
        <div v-html="spacer(187)"></div>
        <center>
          <img
            src="~/assets/images/first-page/slogan.jpg"
            :width="ratio * 850"
            :height="ratio * 270"
          >
        </center>
        <div v-html="spacer(146)"></div>

        <center>
<!--          TODO:resolve-->
          <img
            src="~/assets/images/first-page/text.png"
            :width="ratio * 1024"
            :height="ratio * 499"
          >
        </center>

        <div v-html="spacer(142)"></div>
        <div v-html="spacer(132)"></div>


        <div
          :style='`
              margin:0px auto;
              width: ${ratio * maxWidth}px;
              background-image: url(${require("~/assets/images/first-page/bottom-bar.png")});
              background-size:  ${ratio * maxWidth}px ${ratio * 118}px;
              background-position:bottom;
              height: ${ratio * 318}px;
              position:${sidePaddingBuilder==0?"fixed":"relative"};
              bottom:0px;
            `'
        >
          <center>
            <nuxt-link to="/question/one">
              <div
                :style='`
              margin:0px auto;
               background-size: cover;
              width: ${ratio * 178}px;
              height: ${ratio * 178}px;
              background-image: url(${require("~/assets/images/first-page/button.png")});
              background-position:bottom;
              position:${sidePaddingBuilder==0?"fixed":"absolute"};
              bottom:${ratio * 59}px;
              right:${(0.5*(ratio * maxWidth))-(0.5*(ratio * 178))}px;
            `'
              >
              </div>
            </nuxt-link>
          </center>
        </div>


      </div>
    </div>
  </div>
</template>
