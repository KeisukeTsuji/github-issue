import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/atoms";

const IssueCard = () => {
  const [issue, setIssue] = useState({});
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    getIssueNumber(window.location.pathname);
  }, []);

  const getIssueNumber = (search) => {
    const issueNumber = Number(search.replace("/issues/", ""));
    fetchGithubIssueDetail(issueNumber);
  };
  const setsIssue = (data) => {
    setIssue(data);
  };
  const fetchGithubIssueDetail = (number) => {
    isLoading(true);
    axios
      .create({
        baseURL: "https://api.github.com",
      })
      .get(`/repos/facebook/react/issues/${number}`)
      .then((res) => {
        setsIssue(res.data);
        isLoading(false);
      })
      .catch((e) => {
        console.error(e);
        isLoading(false);
      });
  };
  return (
    <div>
      <p>{issue.number}</p>
      <p>{issue.title}</p>
      <p>{issue.body}</p>
    </div>
  );
};

export default withRouter(IssueCard);
