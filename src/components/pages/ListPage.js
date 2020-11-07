import React, { Component, Fragment } from "react";
import Pagination from "@material-ui/lab/Pagination";
import IssueCard from "../molecules/IssueCard";
import history from "../../config/history";
import { withRouter } from "react-router";
import getGithubApi from "../../api/githubApi";
class ListenPage extends Component {
  constructor() {
    super();
    this.state = {
      allIssues: [],
      issuesDisplayed: [],
      offset: 0,
      parPage: 10,
      pageNumber: 0,
    };
  }
  setAllIssues(data, currentComponent) {
    currentComponent.setState({
      allIssues: data,
    }, () => {
      currentComponent.setPageNumber(window.location.search);
    });
  }
  fetchGithubIssues() {
    getGithubApi(
      "/repos/facebook/react/issues",
      this.setAllIssues,
      this
    );
  }
  displayListPathMatched(n) {
    this.setState({
      issuesDisplayed: [],
    });
    const tmpArr = [];
    for (let i = (n - 1) * 10; i < n * 10; i++) {
      if (this.state.allIssues[i]) {
        tmpArr.push(this.state.allIssues[i]);
      }
    }
    this.setState({
      issuesDisplayed: tmpArr,
    });
  }
  handleClickPagination(e, n) {
    history.push(`/issues?page=${n}`);
  }
  setPageNumber(search) {
    const tmpNumber = Number(search.replace("?page=", ""));
    this.displayListPathMatched(tmpNumber);
    this.setState({
      pageNumber: tmpNumber,
    });
  }
  componentDidMount() {
    this.fetchGithubIssues();
    this.unlisten = history.listen((location) => {
      this.setPageNumber(location.search);
    });
  }
  render() {
    return (
      <Fragment>
        <Pagination
          count={Math.floor(this.state.allIssues.length / 10)}
          page={this.state.pageNumber}
          color="primary"
          onChange={(e, n) => this.handleClickPagination(e, n)}
        />
        <div className="list-page">
          <div className="issue-card-container">
            {this.state.issuesDisplayed.map((userData) => (
              <div key={userData.number} className="issue-card-wrapper">
                <IssueCard
                  number={userData.number}
                  title={userData.title}
                  body={userData.body}
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          a {
            text-decoration: none;
            color: black;
          }
          .list-page {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </Fragment>
    );
  }
}
export default withRouter(ListenPage);
