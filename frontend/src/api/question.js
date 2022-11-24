import { apiInstance } from ".";

const api = apiInstance();

async function doGetQuestionList(param, success, fail) {
  await api.get(`/question`, { params: param }).then(success).catch(fail);
}

async function doGetQuestion(questionNo, success, fail) {
  await api.get(`/question/${questionNo}`).then(success).catch(fail);
}

async function doWriteQuestion(question, success, fail) {
  await api.post(`/question`, question).then(success).catch(fail);
}

async function doModifyQuestion(question, success, fail) {
  await api.put(`/question`, question).then(success).catch(fail);
}

async function doRemoveQuestion(questionNo, success, fail) {
  await api.delete(`/question/${questionNo}`).then(success).catch(fail);
}

export { doGetQuestionList, doGetQuestion, doWriteQuestion, doModifyQuestion, doRemoveQuestion };
