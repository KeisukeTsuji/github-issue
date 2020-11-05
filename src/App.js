import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListPage from "./components/pages/ListPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/:issue" component={ListPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
