import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import IssueCard from "../components/IssueCard";
import history from "../config/history";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/atoms";
import getGithubApi from "../api/githubApi";
import "./styles/Listpage.scss";

const ListPage = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [issuesDisplayed, setIssuesDisplayed] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    getGithubApi("/repos/facebook/react/issues", setsAllIssues, isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let isCleanUp = false;
    history.listen((location) => {
      if (!isCleanUp) {
        setsPageNumber(location.search, allIssues);
      }
    });
    const cleanup = () => {
      isCleanUp = true;
    };
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIssues]);

  const setsAllIssues = (issues) => {
    setAllIssues(issues);
    setsPageNumber(window.location.search, issues);
  };
  const displayListPathMatched = (n, issues) => {
    setIssuesDisplayed([]);
    const tmpArr = [];
    for (let i = (n - 1) * 10; i < n * 10; i++) {
      if (issues[i]) {
        tmpArr.push(issues[i]);
      }
    }
    setIssuesDisplayed(tmpArr);
  };
  const handleClickPagination = (e, n) => {
    history.push(`/issues?page=${n}`);
  };
  const setsPageNumber = (search, issues) => {
    const tmpNumber = Number(search.replace("?page=", ""));
    displayListPathMatched(tmpNumber, issues);
    setPageNumber(tmpNumber);
  };
  const toFirstPage = () => {
    history.push("/issues?page=1");
  };
  const toLastPage = () => {
    history.push(`/issues?page=${Math.floor(allIssues.length / 10)}`);
  };
  return (
    <div className="list-page">
      <div className="pagination-container">
        <button onClick={toFirstPage}>最初</button>
        <Pagination
          count={Math.floor(allIssues.length / 10)}
          page={pageNumber}
          color="primary"
          onChange={(e, n) => handleClickPagination(e, n)}
        />
        <button onClick={() => toLastPage()}>最後</button>
      </div>
      <div className="issue-cards">
        <div className="issue-card-container">
          {issuesDisplayed.map((issueDisplayed) => (
            <div key={issueDisplayed.number} className="issue-card-wrapper">
              <IssueCard
                number={issueDisplayed.number}
                title={issueDisplayed.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default withRouter(ListPage);