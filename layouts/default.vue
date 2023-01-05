<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      assets: "",
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

      this.ratio = (this.windowWidth > 1024
          ? 1024
          : this.windowHeight) /
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
  <v-app>
    <Nuxt/>
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
