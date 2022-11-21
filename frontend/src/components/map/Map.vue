<template>
  <div id="map"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const mapStore = "mapStore";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services,clusterer`;
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
    ...mapGetters(mapStore, ["aptList", "areaAptList"]),
  },
  methods: {
    ...mapActions(mapStore, ["getAptList"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012743, 127.039585),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);

      this.checkArea();
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        this.checkArea();
      });
      kakao.maps.event.addListener(this.map, "dragend", () => {
        this.checkArea();
      });
    },
    checkArea() {
      this.removeMarker();
      this.viewMarker();
    },
    async viewMarker() {
      const bounds = this.map.getBounds();

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const lat1 = sw.Ma;
      const lng1 = sw.La;

      const lat2 = ne.Ma;
      const lng2 = ne.La;

      const level = this.map.getLevel();

      await this.getAptList({ lat1, lng1, lat2, lng2, level });

      if (level < 5) {
        this.aptList.map((apt) => {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(apt.lat, apt.lng),
          });
          this.markers.push(marker);
        });
      } else {
        this.aptList.map((apt) => {
          const marker = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(apt.lat, apt.lng),
            content: `<div class="areaMarker" @click="addrClick(${apt.addrCode})">${apt.addrName}</div>`,
          });
          this.markers.push(marker);
        });
      }
    },
    removeMarker() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    },
    addrClick(addrCode) {
      console.log(addrCode);
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}

.areaMarker {
  padding: 10px;
  background-color: #646464;
  color: white;
  text-align: center;
  border-radius: 40%;
  display: table-cell;
  vertical-align: middle;
}
</style>
