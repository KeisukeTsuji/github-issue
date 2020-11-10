import React from "react";
import { Link } from "react-router-dom";
import "./styles/IssueCard.scss";

const IssueCard = (props) => {
  return (
    <Link to={`issues/${props.number}`}>
      <article class="issue-card">
        <h4>{props.title}</h4>
        <p>{props.number}</p>
      </article>
    </Link>
  );
};

export default IssueCard;
