import { apiInstance } from ".";

const api = apiInstance();

async function doGetAptList(area, success, fail) {
  await api
    .get(`/homedeal/${area.lat1}/${area.lng1}/${area.lat2}/${area.lng2}/${area.level}`)
    .then(success)
    .catch(fail);
}

async function doGetAddrAptList(addrCode, success, fail) {
  await api.get(`/homedeal/apt-info/addr/${addrCode}`).then(success).catch(fail);
}

async function doGetHomeDeal(aptCode, success, fail) {
  await api.get(`/homedeal/${aptCode}`).then(success).catch(fail);
}

export { doGetAptList, doGetAddrAptList, doGetHomeDeal };
