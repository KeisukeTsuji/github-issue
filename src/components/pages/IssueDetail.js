import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import getGithubApi from "../../api/githubApi";

const IssueCard = () => {
  const [issue, setIssue] = useState({});

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
    getGithubApi(`/repos/facebook/react/issues/${number}`, setsIssue);
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
