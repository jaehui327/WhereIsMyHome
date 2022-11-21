<template>
  <section>
    <map-header />
    <map-sidebar />
    <Map />
  </section>
</template>

<script>
import Map from "@/components/map/Map.vue";
import MapSidebar from "../components/map/MapSidebar.vue";
import MapHeader from "../components/map/MapHeader.vue";
export default {
  name: "MapView",
  components: { Map, MapHeader, MapSidebar },
};
</script>

<style scoped>
#wrapper {
  height: calc(100% - 56px);
}
#map {
  width: 100%;
  height: 100%;
}
</style>
