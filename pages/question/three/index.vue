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
      assets: 'assets/images/question-3/',
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
      this.$store.dispatch("answer/answer_3", value);
      this.$router.push('/question/four');
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
        src="~/assets/images/question-3/question.png"
        :width="ratio * 427"
        :height="ratio * 56"
      >
    </center>
    <div v-html="spacer(150)"></div>
    <center>
      <img
        src="~/assets/images/question-3/answer-1.png"
        :width="ratio * 551"
        :height="ratio * 129"
        @click="goNext(0)"
      >
    </center>
    <div v-html="spacer(126)"></div>
    <center>
      <img
        src="~/assets/images/question-3/answer-2.png"
        :width="ratio * 450"
        :height="ratio * 134"
        @click="goNext(1)"
      >
    </center>
    <div v-html="spacer(142)"></div>
  </div>
</template>
