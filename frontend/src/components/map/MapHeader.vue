<template>
  <div id="map-header">
    <b-row class="p-3 bg-dark m-4 rounded" style="width: 600px">
      <b-col sm="10">
        <b-form-input
          id="type-search"
          placeholder="아파트, 지역 검색"
          v-model="search"
        ></b-form-input>
      </b-col>
      <b-button variant="light" class="col-2"><b-icon icon="search"></b-icon></b-button>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "MapHeader",
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style scoped>
#map-header {
  position: absolute;
  width: 100%;
  z-index: 2;
}
</style>
