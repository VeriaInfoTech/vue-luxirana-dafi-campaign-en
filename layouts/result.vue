<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      assets: "assets/images/result-dreamer/",
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
      this.sidePaddingBuilder = this.windowWidth > this.$store.state.setting.maxWidth
        ? ((this.windowWidth - this.$store.state.setting.maxWidth) / 2)
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
    },
    setAssets(uri) {
      this.assets = uri
    },
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

  <v-app>
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
              background-image: url(${require("~/"+assets+"app-bar.png")});
              height: ${ratio * 146}px;
              position:${sidePaddingBuilder==0?"fixed":"relative"};
            `'
        >

        </div>

        <Nuxt
          @set-assets="setAssets"
        />

        <div
          :style='`
              margin:0px auto;
              width: ${ratio * maxWidth}px;
             background-image: url(${require("~/"+assets+"bottom-bar.png")});
              background-size:  cover;
              background-position:bottom;
              height: ${ratio * 118}px;
              position:${sidePaddingBuilder==0?"fixed":paddingBuilder>0?"absolute":"relative"};
              bottom: ${paddingBuilder}px;
            `'
        >
        </div>


      </div>
    </div>
  </v-app>


</template>

<style>
.v-toolbar__content {
  padding: 0px !important;
}

.v-footer {
  padding: 0px !important;
}

/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #fffcfc;
  border-radius: 0px;
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cecaca;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a29c9c;
}
</style>
