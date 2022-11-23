<template>
  <b-row id="map-container" class="d-flex">
    <div id="map"></div>
    <map-sidebar></map-sidebar>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapSidebar from "./MapSidebar.vue";

const mapStore = "mapStore";

export default {
  name: "Map",
  components: {
    MapSidebar,
  },
  data() {
    return {
      map: null,
      markers: [],
      ps: null,
      placeMarkers: [],
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
  watch: {
    selectedAddr: "centerChange",
    isSidebarOpen: "isSidebarOpenChange",
    changedSelectedCategory(value) {
      this.searchPlaces(value);
    },
  },
  computed: {
    ...mapGetters(mapStore, ["selectedAddr", "aptList", "isSidebarOpen", "selectedCategory"]),
    changedSelectedCategory: function () {
      return this.selectedCategory;
    },
  },
  methods: {
    ...mapActions(mapStore, [
      "getAptList",
      "getAddrAptList",
      "getHomeDeal",
      "openSidebar",
      "closeSidebar",
    ]),
    isSidebarOpenChange() {
      if (!this.isSidebarOpen) {
        this.close();
      }
    },
    centerChange() {
      if (this.selectedAddr) {
        if (this.selectedAddr.type === "apt") {
          this.map.setLevel(1);
        }
        this.map.setCenter(new kakao.maps.LatLng(this.selectedAddr.lat, this.selectedAddr.lng));
        this.checkArea();
      }
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012743, 127.039585),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
      this.ps = new kakao.maps.services.Places(this.map);

      this.checkArea();
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        this.checkArea();
      });
      kakao.maps.event.addListener(this.map, "dragend", () => {
        this.checkArea();
        this.closeSidebar();
        this.close();
      });
    },
    checkArea() {
      this.removePlaceMarkers();
      this.searchPlaces(this.selectedCategory);
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
        const imgSrc = require("@/assets/apt.png");
        this.aptList.map((apt) => {
          const aptInfo = document.createElement("div");
          aptInfo.className = "text-center marker";
          aptInfo.innerHTML = `
            <span class="bg-secondary text-white rounded p-1">${this.convertUnit(apt.avg)}억</span>
            <img class="d-block mx-auto" src=${imgSrc} width="48" height="48"/>
            <span class="bg-dark text-white p-1 rounded" style="font-size: 10px">${
              apt.apartmentName
            }</span>
          `;
          aptInfo.addEventListener("click", () => {
            this.markerClick(apt, "apt");
          });
          const marker = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(apt.lat, apt.lng),
            content: aptInfo,
          });
          this.markers.push(marker);
        });
      } else {
        this.aptList.map((apt) => {
          const area = document.createElement("div");
          area.className = "areaMarker marker";
          area.innerHTML = `
          <div>${apt.addrName}</div>
          `;
          if (level < 7) {
            area.innerHTML += `
            <div>${this.convertUnit(apt.avg)}억</div>
            `;
            area.addEventListener("click", () => {
              this.markerClick(apt, "addr");
            });
          }
          const marker = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(apt.lat, apt.lng),
            content: area,
          });

          this.markers.push(marker);
        });
      }
    },
    removeMarker() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    markerClick(marker, type) {
      marker.type = type;
      this.openSidebar({
        marker: marker,
        open: this.open,
      });
      if (type === "addr") {
        this.getAddrAptList(marker.addrCode);
      } else if (type === "apt") {
        this.getHomeDeal(marker.aptCode);
      }
    },
    convertUnit(price) {
      return (parseInt(price) / 10000).toFixed(1);
    },
    open() {
      const mapDiv = document.querySelector("#map");
      if (mapDiv) {
        mapDiv.style.width = "calc(100% - 440px)";
        this.map?.relayout();
      }
    },
    close() {
      const mapDiv = document.querySelector("#map");
      if (mapDiv) {
        mapDiv.style.width = "100%";
        this.map?.relayout();
      }
    },
    removePlaceMarkers() {
      for (let i = 0; i < this.placeMarkers.length; i++) {
        this.placeMarkers[i].setMap(null);
      }
      this.placeMarkers = [];
    },
    searchPlaces(sc) {
      this.removePlaceMarkers();

      if (!sc || sc.length === 0) {
        return;
      }

      sc.map((category) => {
        this.ps.categorySearch(category, this.placesSearchCB, { useMapBounds: true });
      });
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.viewPlaceMarkers(data);
        pagination.nextPage();
      }
    },
    viewPlaceMarkers(places) {
      if (!places) {
        return;
      }
      let imgSrc;
      let bgColor;
      const code = places[0].category_group_code;

      if (code === "MT1") {
        imgSrc = require("@/assets/mart.png");
        bgColor = "#f2b712";
      } else if (code === "PS3") {
        imgSrc = require("@/assets/kindergarden.png");
        bgColor = "#f95904";
      } else if (code === "SC4") {
        imgSrc = require("@/assets/school.png");
        bgColor = "#209414";
      } else if (code === "SW8") {
        imgSrc = require("@/assets/subway.png");
        bgColor = "#ce1f0a";
      } else if (code === "FD6") {
        imgSrc = require("@/assets/restaurant.png");
        bgColor = "#4cd4b7";
      } else if (code === "CE7") {
        imgSrc = require("@/assets/cafe.png");
        bgColor = "#624429";
      } else if (code === "HP8") {
        imgSrc = require("@/assets/hospital.png");
        bgColor = "#60c1f3";
      } else if (code === "PM9") {
        imgSrc = require("@/assets/pharmacy.png");
        bgColor = "#e5748d";
      }
      places.map((place) => {
        const placeInfo = document.createElement("div");
        placeInfo.className = "text-center marker";
        placeInfo.innerHTML = `
          <img class='d-block mx-auto' src=${imgSrc} width='36' height='36' />
          <span class='text-white p-1 rounded' style='font-size: 10px; background-color: ${bgColor};'>
            ${place.place_name}
          </span>
        `;
        const marker = new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(place.y, place.x),
          content: placeInfo,
        });
        this.placeMarkers.push(marker);
      });
    },
  },
};
</script>

<style>
#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
}
#map {
  width: 100%;
  height: 100%;
}

.areaMarker {
  padding: 15px;
  background-color: #646464;
  color: white;
  text-align: center;
  border-radius: 50%;
  display: table-cell;
  vertical-align: middle;
}

.marker:hover {
  cursor: pointer;
}
</style>
