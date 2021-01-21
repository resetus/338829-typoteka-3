'use strict';

const axios = require(`axios`);
const {
  DEFAULT_PORT,
  API_TIMEOUT,
  API_PREFIX
} = require(`../../constants`);

const createApi = (baseURL, timeout = API_TIMEOUT) => {
  const port = process.env.API_PORT || DEFAULT_PORT;
  const defaultURL = `http://localhost:${port}${API_PREFIX}/`;

  const api = axios.create({
    baseURL: baseURL || defaultURL,
    timeout
  });

  const fetch = async (url, options) => {
    const response = await api.request({url, ...options});
    return response.data;
  };

  return {
    api,
    getArticles: () => fetch(`/articles`),
    getArticle: (articleId) => fetch(`/articles/${articleId}`),
    getArticleComments: (articleId) => fetch(`/articles/${articleId}/comments`),
    getCategories: () => fetch(`/categories`),
    searchArticles: (query) => fetch(`/search`, {params: {query}}),
    createArticle: (data) => fetch(`/articles`, {method: `POST`, data})
  };
};

const axiosApi = createApi();

module.exports = {
  createApi,
  axiosApi
};
