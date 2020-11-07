import React, { Component } from "react";
import { Link } from "react-router-dom";

class IssueCard extends Component {
  render() {
    return (
      <Link to={"issues/" + this.props.number}>
        <article>
          <h4>{this.props.title}</h4>
          <p>{this.props.number}</p>
        </article>
        <style jsx>{`
          article {
            max-width: 960px;
            width: 100%;
            padding: 16px;
            border: 1px solid gray;
          }
        `}</style>
      </Link>
    );
  }
}

export default IssueCard;
