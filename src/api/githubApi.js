import axios from "axios";

const getGithubApi = (path, callback, isLoading) => {
  isLoading(true);
  axios
    .create({
      baseURL: "https://api.github.com",
    })
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

export default getGithubApi;
