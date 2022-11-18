<template>
  <section>
    <map-sidebar />
    <Map />
  </section>
</template>

<script>
import Map from "@/components/map/Map.vue";
import MapSidebar from "../components/map/MapSidebar.vue";
export default {
  name: "MapView",
  components: { Map, MapSidebar },
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
