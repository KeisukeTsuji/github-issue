import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/atoms";
import getGithubApi from "../api/githubApi";
import "./styles/IssueDetail.scss"

const IssueCard = () => {
  const [issue, setIssue] = useState({});
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    getGithubApi(
      `/repos/facebook/react/issues/${
        window.location.pathname.split("/").slice(-1)[0]
      }`,
      setsIssue,
      isLoading
    );
  }, []);
  const setsIssue = (data) => {
    setIssue(data);
  };
  return (
    <div class="issue-detail">
      <article className="issue-info">
        <p>{issue.number}</p>
        <h1>{issue.title}</h1>
        <section>{issue.body}</section>
      </article>
    </div>
  );
};

export default withRouter(IssueCard);
