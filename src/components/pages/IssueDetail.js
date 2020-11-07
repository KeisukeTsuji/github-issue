import React from "react";
import getGithubApi from "../../api/githubApi";

export default class IssueCard extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
    };
  }
  getIssueNumber(search) {
    const issueNumber = Number(search.replace("/issues/", ""));
    this.fetchGithubIssueDetail(issueNumber);
  }
  setIssue(data, currentComponent) {
    currentComponent.setState({
      issue: data,
    });
  }
  fetchGithubIssueDetail(number) {
    getGithubApi(`/repos/facebook/react/issues/${number}`, this.setIssue, this);
  }
  componentDidMount() {
    this.getIssueNumber(window.location.pathname);
  }
  render() {
    return (
      <div>
        <p>{this.state.issue.number}</p>
        <p>{this.state.issue.title}</p>
        <p>{this.state.issue.body}</p>
      </div>
    );
  }
}
