import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { loadingState, pageNumberState } from "../recoil/atoms";
import { getGithubApi } from "../api/githubApi";
import "./styles/IssueDetail.scss";

const IssueCard = () => {
  const [issue, setIssue] = useState({});
  const isLoading = useSetRecoilState(loadingState);
  const pageNumber = useRecoilValue(pageNumberState);

  useEffect(() => {
    getGithubApi(
      `/repos/facebook/react/issues/${
        window.location.pathname.split("/").slice(-1)[0]
      }`,
      setsIssue,
      isLoading
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setsIssue = (data) => {
    setIssue(data);
  };
  return (
    <div className="issue-detail">
      <Link to={`/issues?page=${pageNumber}`}>issue一覧に戻る</Link>
      <article className="issue-info">
        <p>{issue.number}</p>
        <h1>{issue.title}</h1>
        <section>{issue.body}</section>
      </article>
    </div>
  );
};

export default withRouter(IssueCard);
