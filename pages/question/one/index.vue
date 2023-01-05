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
      assets: 'assets/images/question-1/',
      title: 'Campaign',
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
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
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
    },
    setAssets(uri) {
      this.assets = uri
    },
    goNext(value) {
      this.$store.dispatch("answer/answer_1", value);
      this.$router.push('/question/two');
    },
  },
  layout: "question",
}
</script>

<template>
  <div>

    <div v-if="paddingBuilder==0" v-html="spacer(146)"></div>
    <div v-html="spacer(257)"></div>
    <center>
      <img
        src="~/assets/images/question-1/question.png"
        :width="ratio * 921*0.9"
        :height="ratio * 75*0.9"
      >
    </center>
    <div v-html="spacer(81)"></div>
    <center>
      <img
        src="~/assets/images/question-1/answer-1.png"
        :width="ratio * 551*0.9"
        :height="ratio * 161*0.9"
        @click="goNext(0)"
      >
    </center>
    <div v-html="spacer(126)"></div>
    <center>
      <img
        src="~/assets/images/question-1/answer-2.png"
        :width="ratio * 924*0.9"
        :height="ratio * 162*0.9"
        @click="goNext(1)"
      >
    </center>
    <div v-html="spacer(142)"></div>
  </div>
</template>
