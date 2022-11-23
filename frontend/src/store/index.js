import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import userStore from "@/store/modules/userStore";
import questionStore from "@/store/modules/questionStore";
import answerStore from "@/store/modules/answerStore";
import mapStore from "@/store/modules/mapStore";
import noticeStore from "@/store/modules/noticeStore";
import newsStore from "@/store/modules/newsStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    questionStore,
    answerStore,
    mapStore,
    noticeStore,
    newsStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
