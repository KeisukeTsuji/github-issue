import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ROUTER_BASENAME } from "./config/routerBaseName";
import ListPage from "./pages/ListPage";
import IssueDetail from "./pages/IssueDetail";
import Loading from "./components/Loading";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={ROUTER_BASENAME}>
          <RecoilRoot>
            <Switch>
              <Route exact path="/issues/:number" component={IssueDetail} />
              <Route exact path="/issues" component={ListPage} />
              <Redirect to="/issues?page=1" />
            </Switch>
            <Loading />
          </RecoilRoot>
        </Router>
      </div>
    );
  }
}

export default App;
