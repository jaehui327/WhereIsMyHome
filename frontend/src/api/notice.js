import { apiInstance } from ".";

const api = apiInstance();

async function doGetNoticeList(param, success, fail) {
  await api.get(`/notice`, { params: param }).then(success).catch(fail);
}

async function doGetNotice(noticeNo, success, fail) {
  await api.get(`/notice/${noticeNo}`).then(success).catch(fail);
}

async function doWriteNotice(notice, success, fail) {
  await api.post(`/notice`, notice).then(success).catch(fail);
}

async function doModifyNotice(notice, success, fail) {
  await api.put(`/notice`, notice).then(success).catch(fail);
}

async function doRemoveNotice(noticeNo, success, fail) {
  await api.delete(`/notice/${noticeNo}`).then(success).catch(fail);
}

export { doGetNoticeList, doGetNotice, doWriteNotice, doModifyNotice, doRemoveNotice };
