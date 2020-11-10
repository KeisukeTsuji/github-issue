import React from "react";
import { Link } from "react-router-dom";
import "./styles/IssueCard.scss";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "../recoil/atoms";

const IssueCard = (props) => {
  const setPageNumber = useSetRecoilState(pageNumberState);

  const setRecoilSearchNumber = (number) => {
    setPageNumber(number);
  };

  return (
    <Link
      to={`issues/${props.number}`}
      onClick={() => setRecoilSearchNumber(props.pageNumber)}
    >
      <article className={`issue-card issue-card-${props.index}`}>
        <h4>{props.title}</h4>
        <p>{props.number}</p>
      </article>
    </Link>
  );
};

export default IssueCard;
