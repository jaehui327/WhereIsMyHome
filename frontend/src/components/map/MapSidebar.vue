<template>
  <div id="map-sidebar" class="bg-light" v-if="isSidebarOpen">
    <b-row id="map-sidebar-header" class="p-3" style="margin: 0">
      <h3 class="d-inline-block p-2 col-md-9">
        {{ selectedAddr.type === "addr" ? selectedAddr.addrName : selectedAddr.apartmentName }}
      </h3>
      <b-button class="ml-auto my-auto col-md-3" variant="dark" style="height: 40px" v-b-toggle.info
        >상세</b-button
      >
    </b-row>
    <div v-if="selectedAddr.type === 'apt'">
      <b-collapse id="info" class="p-1" v-model="isDetailOpen">
        <b-table-simple>
          <b-tr>
            <b-th>건축년도</b-th>
            <b-td>{{ selectedAddr.buildYear }}</b-td>
          </b-tr>
          <b-tr>
            <b-th>주소</b-th>
            <b-td>{{
              address(
                selectedAddr.roadName,
                selectedAddr.roadNameBonbun,
                selectedAddr.roadNameBubun
              )
            }}</b-td>
          </b-tr>
          <b-tr>
            <b-th>평균 분양가</b-th>
            <b-td>{{ selectedAddr.avg | avgPrice }}</b-td>
          </b-tr>
        </b-table-simple>
      </b-collapse>
      <b-table-simple>
        <b-thead style="font-size: 14px">
          <b-th>계약일</b-th>
          <b-th>거래가격</b-th>
          <b-th>전용면적</b-th>
          <b-th>층수</b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="homedeal in selectedHomeDeal" :key="homedeal.no">
            <b-td>{{ dealDate(homedeal.dealYear, homedeal.dealMonth, homedeal.dealDay) }}</b-td>
            <b-td>{{ homedeal.dealAmount | dealPrice }}</b-td>
            <b-td>{{ homedeal.area | aptArea }}m<sup>2</sup></b-td>
            <b-td>{{ homedeal.floor }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-else>
      <b-collapse id="info" class="p-1" v-model="isDetailOpen">
        <b-table-simple>
          <b-tr>
            <b-th>단지</b-th>
            <b-td>{{ selectedAddr.cnt }}</b-td>
          </b-tr>
          <b-tr>
            <b-th>평균 분양가</b-th>
            <b-td>{{ selectedAddr.avg | avgPrice }}</b-td>
          </b-tr>
        </b-table-simple>
      </b-collapse>
      <b-list-group v-for="(aptInfo, index) in selectedHomeDeal" :key="index">
        <b-list-group-item @click="test(aptInfo.aptCode)">
          <p class="font-weight-bold">{{ aptInfo.apartmentName }}</p>
          <span class="ml-auto">
            {{ address(aptInfo.roadName, aptInfo.roadNameBonbun, aptInfo.roadNameBubun) }}
          </span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const mapStore = "mapStore";

export default {
  name: "MapSidebar",
  data() {
    return {
      isDetailOpen: false,
    };
  },
  filters: {
    dealPrice(price) {
      if (!price) return;
      return `${(Number(price.replace(",", "")) / 10000).toFixed(1)}억`;
    },
    aptArea(area) {
      return parseFloat(area).toFixed(1);
    },
    avgPrice(avg) {
      return `${(parseInt(avg) / 10000).toFixed(1)}억`;
    },
  },
  computed: {
    ...mapGetters(mapStore, ["isSidebarOpen", "selectedAddr", "selectedHomeDeal"]),
    ISO: {
      get() {
        return this.isSidebarOpen;
      },
      set() {},
    },
  },
  watch: {
    selectedAddr: "closeDetail",
  },
  methods: {
    ...mapActions[(mapStore, ["addrAptClick"])],
    closeDetail() {
      this.isDetailOpen = false;
    },
    dealDate(year, month, day) {
      return `${year}.${month}.${day}`;
    },
    address(roadName, bonbun, bubun) {
      if (!bonbun || !bubun) return;
      bonbun = Number(bonbun);
      bubun = Number(bubun);
      let addr = `${roadName} ${bonbun}`;
      if (bubun !== 0) {
        addr += "-" + bubun;
      }
      return addr;
    },
    test(aptCode) {
      this.addrAptClick(aptCode);
    },
  },
};
</script>

<style scoped>
#map-sidebar {
  width: 360px;
  height: 100%;
  z-index: 3;
  overflow: auto;
}

#map-sidebar::-webkit-scrollbar {
  width: 6px;
}

#map-sidebar::-webkit-scrollbar-thumb {
  background-color: grey;
}

#map-sidebar-header {
  width: 100%;
}
</style>
