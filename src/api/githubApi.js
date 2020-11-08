import axios from "axios";

const getGithubApi = (path, callback) => {
  axios
    .create({
      baseURL: "https://api.github.com",
    })
    .get(path)
    .then((res) => {
      callback(res.data);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default getGithubApi;
