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

async function doRegisteruser(user, success, fail) {
  await api.post(`/user/join`, user).then(success);
}

export { login, tokenRegeneration, logout };
