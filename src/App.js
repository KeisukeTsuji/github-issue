import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ListPage from "./components/pages/ListPage";
import IssueDetail from "./components/pages/IssueDetail";
import Loading from "./components/atoms/Loading";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <RecoilRoot>
            <Switch>
              <Route exact path="/issues/:number" component={IssueDetail} />
              <Route exact path="/issues" component={ListPage} />
            </Switch>
            <Loading />
          </RecoilRoot>
        </Router>
      </div>
    );
  }
}

export default App;
