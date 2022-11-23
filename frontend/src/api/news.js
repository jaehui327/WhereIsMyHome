import { apiInstance } from ".";

const api = apiInstance();

async function doCrawlNews(success, fail) {
  await api.get(`/news`).then(success).catch(fail);
}

export { doCrawlNews };
