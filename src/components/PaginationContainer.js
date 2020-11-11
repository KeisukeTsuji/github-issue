import React from "react";
import { ROUTER_BASENAME } from "../config/routerBaseName";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import history from "../config/history";
import "./styles/paginationContainer.scss";

const PaginationContainer = (props) => {
  const toFirstPage = () => {
    history.push(`${ROUTER_BASENAME}issues?page=1`);
    props.getGithubApiSetPage(1);
  };
  const toLastPage = () => {
    history.push(`${ROUTER_BASENAME}issues?page=${props.allPagesNumber}`);
    props.getGithubApiSetPage(props.allPagesNumber);
  };
  const handleClickPagination = (e, n) => {
    history.push(`${ROUTER_BASENAME}issues?page=${n}`);
    props.getGithubApiSetPage(n);
  };

  return (
    <div className="pagination-container">
      <Button onClick={() => toFirstPage()}>最初</Button>
      <Pagination
        count={Number(props.allPagesNumber)}
        page={props.pageNumber}
        color="primary"
        onChange={(e, n) => handleClickPagination(e, n)}
      />
      <Button onClick={() => toLastPage()}>最後</Button>
    </div>
  );
};

export default PaginationContainer;
