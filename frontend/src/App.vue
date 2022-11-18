<template>
  <div id="app">
    <Nav />
    <Header />
    <router-view id="wrapper"></router-view>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Nav,
    Header,
    Footer,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
#wrapper {
  width: 100%;
  height: auto;
  min-height: calc(100% - 433.49px);
}
</style>
