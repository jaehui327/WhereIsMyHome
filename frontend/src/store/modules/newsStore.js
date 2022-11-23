import { doCrawlNewsList } from "@/api/news";

const newsStore = {
  namespaced: true,
  state: {
    newsList: [],
  },
  getters: {
    newsList(state) {
      return state.newsList;
    },
  },
  mutations: {
    SET_NEWS_LIST(state, newsList) {
      state.newsList = newsList;
    },
  },
  actions: {
    async crawlNewsList({ commit }) {
      await doCrawlNewsList(
        ({ data }) => {
          commit("SET_NEWS_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default newsStore;
