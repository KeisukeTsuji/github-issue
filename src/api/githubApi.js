import axios from "axios";
const baseURL = "https://api.github.com";
const axiosUrlSet = axios.create({ baseURL });

export const getGithubApi = (path) => {
  return axiosUrlSet.get(path);
};
