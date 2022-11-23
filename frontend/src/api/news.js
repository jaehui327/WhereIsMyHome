import { apiInstance } from ".";

const api = apiInstance();

async function doCrawlNewsList(success, fail) {
  await api.get(`/news`).then(success).catch(fail);
}

export { doCrawlNewsList };
