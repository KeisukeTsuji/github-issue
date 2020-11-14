import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { loadingState, pageNumberState } from "../recoil/atoms";
import { getGithubApi } from "../api/githubApi";
import "./styles/IssueDetail.scss";
const marked = require("marked");

const IssueCard = () => {
  const [issue, setIssue] = useState({});
  const isLoading = useSetRecoilState(loadingState);
  const pageNumber = useRecoilValue(pageNumberState);

  useEffect(() => {
    isLoading(true);
    async function fetchGithubApi() {
      const res = await getGithubApi(
        `/repos/facebook/react/issues/${
          window.location.pathname.split("/").slice(-1)[0]
        }`
      );
      try {
        setsIssue(res.data);
      } catch (e) {
        console.error(e);
        alert("データが取得できませんでした。");
      } finally {
        isLoading(false);
      }
    }
    fetchGithubApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setsIssue = (data) => {
    setIssue(data);
  };
  const MarkdownToHtml = (body) => {
    if (body) {
      return marked(body);
    } else {
      return "";
    }
  };
  return (
    <div className="issue-detail">
      <Link to={`/issues?page=${pageNumber}`}>issue一覧に戻る</Link>
      <article className="issue-info">
        <p>{issue.number}</p>
        <h1>{issue.title}</h1>
        <section
          dangerouslySetInnerHTML={{ __html: MarkdownToHtml(issue.body) }}
        />
      </article>
    </div>
  );
};

export default withRouter(IssueCard);
