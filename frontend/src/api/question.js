import { apiInstance } from ".";

const api = apiInstance();

async function doGetQuestionList(success, fail) {
  await api.get(`/question`).then(success).catch(fail);
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
// writeQnA(context, payload) {
//   axios.post("http://localhost:8001/question", payload).then(() => {
//     alert("작성 완료");
//     router.push("/qna/list");
//   });
// },
// modifyQnA(context, payload) {
//   axios.put("http://localhost:8001/question", payload).then(() => {
//     alert("수정 완료");
//     router.push(`/qna/view/${payload.no}`);
//   });
// },
// removeQnA(context, payload) {
//   axios.delete(`http://localhost:8001/question/${payload}`).then(() => {
//     context.commit("SET_QNA", {});
//     alert("삭제 완료");
//     router.push("/qna/list");
//   });
// },
export { doGetQuestionList, doGetQuestion, doWriteQuestion, doModifyQuestion, doRemoveQuestion };
