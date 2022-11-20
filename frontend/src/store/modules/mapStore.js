import { doGetAptList } from "@/api/map";

const mapStore = {
  namespaced: true,
  state: {
    aptList: [],
  },
  getters: {
    aptList: (state) => {
      return state.aptList;
    },
    areaAptList: (state) => (lat1, lng1, lat2, lng2, level) => {
      console.log(level);
      const ret = [];
      state.aptList.map((apt) => {
        // console.log(apt);
        if (apt.lng >= lng1 && apt.lat >= lat1 && apt.lng <= lng2 && apt.lat <= lat2) {
          ret.push(apt);
        }
      });
      return ret;
    },
  },
  mutations: {
    SET_APT_LIST(state, aptList) {
      state.aptList = aptList;
    },
  },
  actions: {
    async getAptList({ commit }, area) {
      await doGetAptList(
        area,
        ({ data }) => {
          console.log(data);
          commit("SET_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default mapStore;
