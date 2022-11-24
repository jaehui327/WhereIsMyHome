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
    totalCnt: 0,
  },
  getters: {
    questionList(state) {
      return state.questionList;
    },
    question(state) {
      return state.question;
    },
    totalCnt(state) {
      return state.totalCnt;
    },
  },
  mutations: {
    SET_QUESTION_LIST(state, questionList) {
      state.questionList = questionList;
    },
    SET_QUESTION(state, question) {
      state.question = question;
    },
    SET_TOTALCNT(state, totalCnt) {
      state.totalCnt = totalCnt;
    },
  },
  actions: {
    async getQuestionList({ commit }, param) {
      await doGetQuestionList(
        param,
        ({ data }) => {
          commit("SET_QUESTION_LIST", data.questions);
          commit("SET_TOTALCNT", data.totalCnt);
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
      let status;
      await doRemoveQuestion(
        questionNo,
        ({ data }) => {
          commit("SET_QUESTION_LIST", data);
          status = 200;
        },
        (error) => {
          console.log(error);
        }
      );
      return status;
    },
  },
};

export default questionStore;
