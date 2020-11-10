import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/atoms";
import getGithubApi from "../api/githubApi";

const IssueCard = () => {
  const [issue, setIssue] = useState({});
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    getGithubApi(
      `/repos/facebook/react/issues/${Number(
        window.location.pathname.replace("/issues/", "")
      )}`,
      setsIssue,
      isLoading
    );
  }, []);
  const setsIssue = (data) => {
    setIssue(data);
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
