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
      assets: 'assets/images/question-6/',
      title: 'Question 6',
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
    goNext(value) {
      if (this.$store.state.answer.answer_3 == 1) {
        // Get.toNamed("/result-trustworthy");
        this.$router.push("/result/dreamer");
      } else if (this.$store.state.answer.answer_4 == 0) {
        // this.$router.push("/result/dreamer");
        this.$router.push("/result/exclusive");
      } else if (this.$store.state.answer.answer_5 == 0) {
        // this.$router.push("/result/exclusive");
        this.$router.push("/result/trustworthy");
      } else if (this.$store.state.answer.answer_6 == 0) {
        this.$router.push("/result/seducer");
      } else if (this.$store.state.answer.answer_6 == 1) {
        this.$router.push("/result/selfless");
      } else {
        this.$router.push("/");
      }
      return
      this.$store.dispatch("answer/answer_6", value);
      this.$router.push('/lead');
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
        src="~/assets/images/question-6/question.png"
        :width="ratio * 705"
        :height="ratio * 56"
      >
    </center>
    <div v-html="spacer(150)"></div>
    <center>
      <img
        src="~/assets/images/question-6/answer-1.png"
        :width="ratio * 540"
        :height="ratio * 123"
        @click="goNext(0)"
      >
    </center>
    <div v-html="spacer(126)"></div>
    <center>
      <img
        src="~/assets/images/question-6/answer-2.png"
        :width="ratio * 621"
        :height="ratio * 123"
        @click="goNext(1)"
      >
    </center>
    <div v-html="spacer(142)"></div>
  </div>
</template>
