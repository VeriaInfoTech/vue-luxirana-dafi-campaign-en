<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      clipped: false,
      assets: 'assets/images/result-exclusive/',
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
  created() {
    this.$parent.$emit('set-assets', this.assets)
    this.initialze()
    window.addEventListener("resize", this.myEventHandler);
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
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  layout: "result",
}
</script>

<template>
  <div>

    <div v-if="paddingBuilder==0" v-html="spacer(146)"></div>
    <div v-html="spacer(51)"></div>
    <center>
      <img
        src="~/assets/images/result-exclusive/full.png"
        :width="`${ratio * 919}px;`"
        :height="`${ratio * 1694}px;`"
      >
    </center>
      <div v-html="spacer(121)"></div>

  </div>
</template>
