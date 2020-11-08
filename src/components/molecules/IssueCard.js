import React from "react";
import { Link } from "react-router-dom";

const IssueCard = (props) => {
  return (
    <Link to={`issues/${props.number}`}>
      <article>
        <h4>{props.title}</h4>
        <p>{props.number}</p>
      </article>
      <style>{`
        article {
          max-width: 960px;
          width: 100%;
          padding: 16px;
          border: 1px solid gray;
        }
      `}</style>
    </Link>
  );
};

export default IssueCard;
