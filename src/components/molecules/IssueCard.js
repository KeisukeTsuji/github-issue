import React, { Fragment } from "react";

export default class IssueCard extends React.Component {
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
