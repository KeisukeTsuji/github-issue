import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import IssueCard from "../molecules/IssueCard";
import history from "../../config/history";
import { withRouter } from "react-router";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/atoms";

const ListPage = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [issuesDisplayed, setIssuesDisplayed] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const isLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    isLoading(true);
    axios
      .create({
        baseURL: "https://api.github.com",
      })
      .get("/repos/facebook/react/issues")
      .then((res) => {
        setsAllIssues(res.data);
        isLoading(false);
      })
      .catch((e) => {
        console.error(e);
        isLoading(false);
      });
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
    <Fragment>
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
      <div className="list-page">
        <div className="issue-card-container">
          {issuesDisplayed.map((userData) => (
            <div key={userData.number} className="issue-card-wrapper">
              <IssueCard number={userData.number} title={userData.title} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        a {
          text-decoration: none;
          color: black;
        }
        .list-page {
          display: flex;
          justify-content: center;
        }
        .pagination-container {
          display: flex;
        }
      `}</style>
    </Fragment>
  );
};
export default withRouter(ListPage);
