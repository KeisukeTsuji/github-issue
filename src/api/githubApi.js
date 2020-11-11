import axios from "axios";
const parse = require("parse-link-header");
const baseURL = "https://api.github.com";
const axiosUrlSet = axios.create({ baseURL });

export const getGithubApiWithPageNumber = (path, callback, isLoading) => {
  isLoading(true);
  axiosUrlSet
    .get(path)
    .then((res) => {
      const parsed = parse(res.headers.link);
      if (parsed.last) {
        callback(res.data, parsed.last.page);
      } else {
        // 最後のページの場合 parsed.last.page が取得できないので window.location.search から取得
        callback(res.data, window.location.search.replace("?page=", ""));
      }
      isLoading(false);
    })
    .catch((e) => {
      console.error(e);
      isLoading(false);
    });
};

export const getGithubApi = (path, callback, isLoading) => {
  isLoading(true);
  axiosUrlSet
    .get(path)
    .then((res) => {
      callback(res.data);
      isLoading(false);
    })
    .catch((e) => {
      console.error(e);
      isLoading(false);
    });
};
