<template>
  <b-row class="m-2" id="map-header">
    <b-button v-b-toggle.map-sidebar id="map-sidebar-toggle"
      ><b-icon icon="list" style="width: 30px; height: 30px"></b-icon
    ></b-button>
  </b-row>
</template>

<script>
export default {
  name: "MapHeader",
};
</script>

<style scoped>
#map-header {
  position: absolute;
  z-index: 2;
}
</style>
