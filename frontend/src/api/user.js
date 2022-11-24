import { apiInstance } from ".";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, user).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userId, success, fail) {
  await api.get(`/user/logout/${userId}`).then(success).catch(fail);
}

async function doRegisterUser(user, success, fail) {
  await api.post(`/user/join`, user).then(success).catch(fail);
}

async function removeUser(userId, success, fail) {
  await api.delete(`/user/${userId}`).then(success).catch(fail);
}

async function modifyUser(user, success, fail) {
  await api.put(`/user`, user).then(success).catch(fail);
}

async function doIdCheck(userId, success, fail) {
  await api.get(`/user/join/idcheck/${userId}`).then(success).catch(fail);
}

export { login, tokenRegeneration, logout, doRegisterUser, removeUser, modifyUser, doIdCheck };
