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
  created() {
    this.closeSidebar();
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
    ...mapGetters(mapStore, ["aptList"]),
  },
  methods: {
    ...mapActions(mapStore, ["getAptList", "sidebarToggle", "getAddrAptList", "closeSidebar"]),
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
          const test = document.createElement("div");
          test.className = "areaMarker";
          test.innerText = apt.addrName;
          test.addEventListener("click", () => {
            this.addrClick(apt);
          });
          const marker = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(apt.lat, apt.lng),
            content: test,
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
    addrClick(addr) {
      this.map.panTo(new kakao.maps.LatLng(addr.lat, addr.lng));
      this.getAddrAptList(addr.addrCode);
      this.sidebarToggle(addr);
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

.areaMarker:hover {
  cursor: pointer;
}
</style>
