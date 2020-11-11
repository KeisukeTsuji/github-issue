import React, { useState, useEffect } from "react";
import IssueCard from "../components/IssueCard";
import PaginationContainer from "../components/PaginationContainer";
import history from "../config/history";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/atoms";
import { getGithubApiWithPageNumber } from "../api/githubApi";
import "./styles/Listpage.scss";

const ListPage = () => {
  const [issuesDisplayed, setIssuesDisplayed] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [allPagesNumber, setAllPagesNumber] = useState(0);
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    const searchNumber = window.location.search.replace("?page=", "");
    getGithubApiWithPageNumber(
      `/repos/facebook/react/issues?page=${searchNumber}&per_page=10`,
      setsIssuesDisplayed,
      isLoading
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let isCleanUp = false;
    history.listen((location) => {
      if (!isCleanUp) {
        setsPageNumber(location.search, issuesDisplayed);
      }
    });
    const cleanup = () => {
      isCleanUp = true;
    };
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issuesDisplayed]);

  const setsIssuesDisplayed = (issues, page) => {
    setAllPagesNumber(page);
    setIssuesDisplayed(issues);
    setsPageNumber(window.location.search, issues);
  };
  const setsPageNumber = (search) => {
    const page = Number(search.replace("?page=", ""));
    setPageNumber(page);
  };
  const getGithubApiSetPage = (page) => {
    getGithubApiWithPageNumber(
      `/repos/facebook/react/issues?page=${page}&per_page=10`,
      setsIssuesDisplayed,
      isLoading
    );
  };
  return (
    <div className="list-page">
      <PaginationContainer
        allPagesNumber={allPagesNumber}
        pageNumber={pageNumber}
        getGithubApiSetPage={getGithubApiSetPage}
      />
      <div className="issue-cards">
        <div className="issue-card-container">
          {issuesDisplayed.map((issueDisplayed, i) => (
            <div key={issueDisplayed.number} className="issue-card-wrapper">
              <IssueCard
                number={issueDisplayed.number}
                title={issueDisplayed.title}
                index={i}
                pageNumber={pageNumber}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default withRouter(ListPage);
