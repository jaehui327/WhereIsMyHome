import {
  doGetQuestionList,
  doGetQuestion,
  doWriteQuestion,
  doModifyQuestion,
  doRemoveQuestion,
} from "@/api/question";

const questionStore = {
  namespaced: true,
  state: {
    questionList: [],
    question: null,
  },
  getters: {
    questionList(state) {
      return state.questionList;
    },
    question(state) {
      return state.question;
    },
  },
  mutations: {
    SET_QUESTION_LIST(state, questionList) {
      state.questionList = questionList;
    },
    SET_QUESTION(state, question) {
      state.question = question;
    },
  },
  actions: {
    async getQuestionList({ commit }) {
      await doGetQuestionList(
        ({ data }) => {
          commit("SET_QUESTION_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getQuestion({ commit }, questionNo) {
      await doGetQuestion(
        questionNo,
        ({ data }) => {
          commit("SET_QUESTION", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async writeQuestion({ commit }, question) {
      await doWriteQuestion(
        question,
        ({ data }) => {
          commit("SET_QUESTION_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyQuestion({ commit }, question) {
      await doModifyQuestion(
        question,
        ({ data }) => {
          commit("SET_QUESTION_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async removeQuestion({ commit }, questionNo) {
      await doRemoveQuestion(
        questionNo,
        ({ data }) => {
          commit("SET_QUESTION_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default questionStore;
