<template>
  <section>
    <Map />
  </section>
</template>

<script>
import Map from "@/components/map/Map.vue";
export default {
  name: "MapView",
  components: { Map },
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
