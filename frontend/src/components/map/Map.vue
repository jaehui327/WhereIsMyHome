<template>
  <div id="map"></div>
</template>

<script>
import { mapGetters } from "vuex";

const mapStore = "mapStore";

export default {
  name: "Map",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  computed: {
    ...mapGetters(mapStore, ["aptList"]),
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012743, 127.039585),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    initMarker() {
      console.log();
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
