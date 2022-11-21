import { doGetAptList, doGetAddrAptList } from "@/api/map";

const mapStore = {
  namespaced: true,
  state: {
    aptList: [],
    addrAptList: [],
    isSidebarOpen: false,
    selectedAddr: null,
  },
  getters: {
    aptList: (state) => {
      return state.aptList;
    },
    addrAptList: (state) => {
      return state.addrAptList;
    },
    isSidebarOpen: (state) => {
      return state.isSidebarOpen;
    },
    selectedAddr: (state) => {
      return state.selectedAddr;
    },
  },
  mutations: {
    SET_APT_LIST(state, aptList) {
      state.aptList = aptList;
    },
    SET_IS_SIDEBAR_OPEN(state, isSidebarOpen) {
      state.isSidebarOpen = isSidebarOpen;
    },
    SET_SELECTED_ADDR(state, addr) {
      state.selectedAddr = addr;
    },
    SET_ADDR_APT_LIST(state, addrAptList) {
      state.addrAptList = addrAptList;
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
    sidebarToggle({ state, commit }, addr) {
      if (state.isSidebarOpen) {
        if (state.selectedAddr.addrCode === addr.addrCode) {
          commit("SET_IS_SIDEBAR_OPEN", false);
          commit("SET_SELECTED_ADDR", null);
        } else {
          commit("SET_SELECTED_ADDR", addr);
        }
      } else {
        commit("SET_IS_SIDEBAR_OPEN", true);
        commit("SET_SELECTED_ADDR", addr);
      }
    },
    closeSidebar({ commit }) {
      commit("SET_IS_SIDEBAR_OPEN", false);
      commit("SET_SELECTED_ADDR", null);
    },
    async getAddrAptList({ commit }, addrCode) {
      await doGetAddrAptList(
        addrCode,
        ({ data }) => {
          commit("SET_ADDR_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default mapStore;
