import axios from "axios";

const getGithubApi = (path, callback, currentComponent) => {
  axios
    .create({
      baseURL: "https://api.github.com",
    })
    .get(path)
    .then((res) => {
      callback(res.data, currentComponent);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default getGithubApi;
