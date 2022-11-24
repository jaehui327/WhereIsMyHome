import { doGetNoticeList, doGetNotice, doWriteNotice, doRemoveNotice } from "@/api/notice";

const questionStore = {
  namespaced: true,
  state: {
    noticeList: [],
    notice: null,
    totalCnt: 0,
  },
  getters: {
    noticeList(state) {
      return state.noticeList;
    },
    notice(state) {
      return state.notice;
    },
    totalCnt(state) {
      return state.totalCnt;
    },
  },
  mutations: {
    SET_NOTICE_LIST(state, noticeList) {
      state.noticeList = noticeList;
    },
    SET_NOTICE(state, notice) {
      state.notice = notice;
    },
    SET_TOTALCNT(state, totalCnt) {
      state.totalCnt = totalCnt;
    },
  },
  actions: {
    async getNoticeList({ commit }, param) {
      await doGetNoticeList(
        param,
        ({ data }) => {
          commit("SET_NOTICE_LIST", data.notices);
          commit("SET_TOTALCNT", data.totalCnt);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getNotice({ commit }, noticeNo) {
      await doGetNotice(
        noticeNo,
        ({ data }) => {
          commit("SET_NOTICE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async writeNotice({ commit }, notice) {
      await doWriteNotice(
        notice,
        ({ data }) => {
          commit("SET_NOTICE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async removeNotice({ commit }, noticeNo) {
      await doRemoveNotice(
        noticeNo,
        ({ data }) => {
          commit("SET_NOTICE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default questionStore;
