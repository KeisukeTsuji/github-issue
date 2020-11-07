import React, { Component, Fragment } from "react";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import IssueCard from "../molecules/IssueCard";
import history from "../../config/history";
import { withRouter } from "react-router";
class ListenPage extends Component {
  constructor() {
    super();
    this.state = {
      allIssues: [],
      issuesDisplayed: [],
      offset: 0,
      parPage: 10,
      pageNumber: 1,
    };
  }
  setInitIssuesDisplayed(data) {
    const tmpArr = [];
    for (let i = 0; i < 10; i++) {
      tmpArr.push(this.state.allIssues[i]);
    }
    this.setState({
      issuesDisplayed: tmpArr,
    });
  }
  fetchGithubIssues() {
    const request = axios.create({
      baseURL: "https://api.github.com",
    });
    request
      .get("/repos/facebook/react/issues")
      .then((res) => {
        this.setState({
          allIssues: res.data,
        });
        this.setInitIssuesDisplayed(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
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
  componentDidMount() {
    this.fetchGithubIssues();
    this.unlisten = history.listen((location, action) => {
      const tmpNumber = Number(location.search.replace("?page=", ""));
      this.displayListPathMatched(tmpNumber);
      this.setState({
        pageNumber: tmpNumber,
      });
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
