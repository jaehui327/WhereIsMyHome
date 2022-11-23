<template>
  <div id="map-header" class="m-4 d-flex bg-dark rounded">
    <b-input-group class="p-3">
      <template #append>
        <b-button variant="secondary"><b-icon icon="search"></b-icon></b-button>
      </template>
      <b-form-input
        id="type-search"
        placeholder="아파트, 지역 검색"
        v-model="search"
      ></b-form-input>
    </b-input-group>
    <div class="p-2">
      <b-form-checkbox-group
        class="text-white"
        v-model="selected"
        :options="options"
        size="sm"
      ></b-form-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const mapStore = "mapStore";

export default {
  name: "MapHeader",
  data() {
    return {
      search: "",
      selected: [],
      options: [
        { text: "대형마트", value: "MT1" },
        { text: "어린이집, 유치원", value: "PS3" },
        { text: "학교", value: "SC4" },
        { text: "지하철역", value: "SW8" },
        { text: "음식점", value: "FD6" },
        { text: "카페", value: "CE7" },
        { text: "병원", value: "HP8" },
        { text: "약국", value: "PM9" },
      ],
    };
  },
  watch: {
    selected: "select",
  },
  computed: {
    ...mapGetters(mapStore, ["selectedCategory"]),
  },
  methods: {
    ...mapActions(mapStore, ["setSelectedCategory"]),
    select() {
      this.setSelectedCategory(this.selected);
    },
  },
};
</script>

<style scoped>
#map-header {
  position: absolute;
  min-width: 884px;
  z-index: 2;
}
</style>
