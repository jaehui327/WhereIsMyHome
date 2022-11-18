import { doGetAnswerList, doWriteAnswer, doRemoveAnswer, doModifyAnswer } from "@/api/answer";

const answerStore = {
  namespaced: true,
  state: {
    answerList: [],
  },
  getters: {
    answerList(state) {
      return state.answerList;
    },
  },
  mutations: {
    SET_ANSWER_LIST(state, answerList) {
      state.answerList = answerList;
    },
  },
  actions: {
    async getAnswerList({ commit }, questionNo) {
      await doGetAnswerList(
        questionNo,
        ({ data }) => {
          commit("SET_ANSWER_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async writeAnswer({ commit }, answer) {
      await doWriteAnswer(
        answer,
        ({ data }) => {
          commit("SET_ANSWER_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async removeAnswer({ commit }, { questionNo, answerNo }) {
      await doRemoveAnswer(
        questionNo,
        answerNo,
        ({ data }) => {
          commit("SET_ANSWER_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyAnswer({ commit }, { questionNo, answerNo, content }) {
      await doModifyAnswer(
        questionNo,
        answerNo,
        content,
        ({ data }) => {
          commit("SET_ANSWER_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default answerStore;
