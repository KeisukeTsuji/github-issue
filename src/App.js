import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListPage from "./components/pages/ListPage";
import IssueDetail from "./components/pages/IssueDetail";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/issues/:number" component={IssueDetail} />
              <Route exact path="/issues" component={ListPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
