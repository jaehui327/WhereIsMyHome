import { apiInstance } from ".";

const api = apiInstance();

async function doGetAnswerList(questionNo, success, fail) {
  await api.get(`/answer/${questionNo}`).then(success).catch(fail);
}

async function doWriteAnswer(answer, success, fail) {
  await api.post(`/answer`, answer).then(success).catch(fail);
}

async function doRemoveAnswer(questionNo, answerNo, success, fail) {
  await api.delete(`/answer/${questionNo}/${answerNo}`).then(success).catch(fail);
}

async function doModifyAnswer(questionNo, answerNo, content, success, fail) {
  await api
    .put(`/answer/${questionNo}/${answerNo}`, { content: content })
    .then(success)
    .catch(fail);
}

export { doGetAnswerList, doWriteAnswer, doRemoveAnswer, doModifyAnswer };
