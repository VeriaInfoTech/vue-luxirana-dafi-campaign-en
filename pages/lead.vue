<script>
export default {
  name: 'LeadPage',
  data() {
    return {
      error: false,
      isLoading: false,
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
    pressSubmitLogin() {
      this.error = false
      this.isLoading = true


      if (this.mobile.length == 11) {
        if (this.mobile[0].toString() != '0') {
          this.error = (true);
        }
        this.request.mobile = ('+98' + this.mobile.substring(1));
      } else if (this.mobile.length == 10) {
        this.request.mobile = ('+98' + this.mobile);
      } else {
        this.error = (true);
      }

      if (this.error) {
        this.isLoading = false
        return
      }
      this.$store.dispatch("otp/otp", this)
    },
    done() {
      this.$router.push('/verify');
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

        <div v-if="paddingBuilder==0" v-html="spacer(146)"></div>
        <div v-html="spacer(122)"></div>

<!--        TODO:RESOLVE-->
        <center>
          <img
            src="~/assets/images/lead-page/text.png"
            :width="ratio * 877"
            :height="ratio * 174"
          >
        </center>
        <div v-html="spacer(32)"></div>

<!--        <center>-->
<!--          <img-->
<!--            src="~/assets/images/lead-page/text-2.png"-->
<!--            :width="ratio * 891"-->
<!--            :height="ratio * 136"-->
<!--          >-->
<!--        </center>-->


        <div v-html="spacer(70)"></div>
        <center>

          <div
            :style='`
              margin:0px auto;
              width: ${ratio * 820}px;
              height: ${ratio * 145}px;
              background-image: url(${require("~/assets/images/lead-page/input-mobile.png")});
              background-size:  cover;
              background-position:bottom;
              bottom:0px;
            `'
          >
            <div>
              <div
                :style="`
                       width: ${ratio * 465}px;
                       height: ${ratio * 52}px;
                       position:relative;
                       right: ${ratio * 100}px;
                       color: white !important;
                      `"
              >
                <v-text-field
                  dark
                  placeholder="9123456789"
                  :color="error?'red':'white'"
                  :style="`color: white !important;border-bottom:${error?'5px':'0px'} solid red`"
                  hide-details="auto"
                  v-model="mobile"
                ></v-text-field>
              </div>
            </div>
          </div>

        </center>

        <div v-html="spacer(50)"></div>
        <center>
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="purple"
          ></v-progress-circular>
          <img
            v-else
            src="~/assets/images/lead-page/button.png"
            :width="ratio * 207"
            :height="ratio * 85"
            @click="pressSubmitLogin"
          >

        </center>

        <div v-html="spacer(132)"></div>


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
