import { doGetAptList, doGetAddrAptList, doGetHomeDeal } from "@/api/map";

const mapStore = {
  namespaced: true,
  state: {
    aptList: [],
    isSidebarOpen: false,
    selectedAddr: null,
    selectedHomeDeal: [],
  },
  getters: {
    aptList: (state) => {
      return state.aptList;
    },

    isSidebarOpen: (state) => {
      return state.isSidebarOpen;
    },
    selectedAddr: (state) => {
      return state.selectedAddr;
    },
    selectedHomeDeal: (state) => {
      return state.selectedHomeDeal;
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
    SET_SELECTED_HOMEDEAL(state, homedeal) {
      state.selectedHomeDeal = homedeal;
    },
  },
  actions: {
    async getAptList({ commit }, area) {
      await doGetAptList(
        area,
        ({ data }) => {
          commit("SET_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    openSidebar({ commit }, { marker, open }) {
      open();
      commit("SET_IS_SIDEBAR_OPEN", true);
      commit("SET_SELECTED_ADDR", marker);
    },
    closeSidebar({ commit }) {
      commit("SET_IS_SIDEBAR_OPEN", false);
      commit("SET_SELECTED_ADDR", null);
    },

    async getAddrAptList({ commit }, addrCode) {
      await doGetAddrAptList(
        addrCode,
        ({ data }) => {
          commit("SET_SELECTED_HOMEDEAL", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getHomeDeal({ commit }, aptCode) {
      await doGetHomeDeal(
        aptCode,
        ({ data }) => {
          data.sort((a, b) => {
            if (
              `${a.dealYear}.${a.dealMonth}.${a.dealDay}` >
              `${b.dealYear}.${b.dealMonth}.${b.dealDay}`
            ) {
              return -1;
            } else {
              return 1;
            }
          });
          commit("SET_SELECTED_HOMEDEAL", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    addrAptClick({ commit }, aptCode) {
      console.log(commit);
      console.log(aptCode);
    },
  },
};

export default mapStore;
