<template>
  <b-sidebar id="map-sidebar" width="500px" v-model="ISO" right @hidden="close">
    <div class="p-4">
      <h2 class="font-weight-bold">{{ selectedAddr === null ? "" : selectedAddr.addrName }}</h2>
    </div>
    {{ addrAptList }}
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const mapStore = "mapStore";

export default {
  name: "MapSidebar",
  computed: {
    ...mapGetters(mapStore, ["isSidebarOpen", "selectedAddr", "addrAptList"]),
    ISO: {
      get() {
        return this.isSidebarOpen;
      },
      set() {},
    },
  },
  methods: {
    ...mapActions(mapStore, ["closeSidebar"]),
    close() {
      this.closeSidebar();
    },
  },
};
</script>

<style scoped></style>
