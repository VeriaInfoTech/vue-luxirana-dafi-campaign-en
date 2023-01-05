<script>
export default {
  name: 'LeadPage',
  data() {
    return {
      error: false,
      isLoading: false,
      message: "",
      otp: null,
      mobile: "",
      request: {
        mobile: "",
        country: "IR",
        source: "dafi",
      },
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
    onEnter: function () {
      this.requestVerify();
    },
    requestVerify() {
      this.isLoading = true
      this.$store.dispatch('otp/verify', this);
      this.$store.dispatch('notification/clear')
    },
    resetOtp() {
      this.otp = null
      this.isLoading = false
    },
    showResult() {
      if (this.$store.state.answer.answer_3 == 1) {
        // Get.toNamed("/result-trustworthy");
        this.$router.push("/result/dreamer");
      } else if (this.$store.state.answer.answer_4 == 0) {
        // this.$router.push("/result/dreamer");
        this.$router.push("/result/exclusive");
      }else if (this.$store.state.answer.answer_5 == 0) {
        // this.$router.push("/result/exclusive");
        this.$router.push("/result/trustworthy");
      }else if (this.$store.state.answer.answer_6 == 0) {
        this.$router.push("/result/seducer");
      }else if (this.$store.state.answer.answer_6 == 1) {
        this.$router.push("/result/selfless");
      }else{
        this.$router.push("/");
      }


      this.isLoading = false
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
              background-image: url(${require("~/assets/images/lead-page/app-bar.png")});
              height: ${ratio * 146}px;
              position:${sidePaddingBuilder==0?"fixed":"relative"};
            `'
        >

        </div>

        <div v-html="spacer(windowHeight*0.5)"></div>
        <div style="padding:30px">
          <v-otp-input
            style="height:54px"
            v-model="otp"
            type="number"
            length="6"
            @finish="onEnter"
          ></v-otp-input>
        </div>

        <div style="padding:30px">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="purple"
          ></v-progress-circular>
          <strong
            v-else
            v-html="message"
          >
          </strong>
        </div>

        <div
          :style='`
              margin:0px auto;
              width: ${ratio * maxWidth}px;
              background-image: url(${require("~/assets/images/lead-page/bottom-bar.png")});
              background-size:  ${ratio * maxWidth}px ${ratio * 118}px;
              background-position:bottom;
              height: ${ratio * 318}px;
              position:${sidePaddingBuilder==0?"fixed":paddingBuilder>0?"absolute":"relative"};
              bottom: ${paddingBuilder}px;
            `'
        >
        </div>


      </div>
    </div>
  </div>
</template>
