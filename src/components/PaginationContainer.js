import React from "react";
import { ROUTER_BASENAME } from "../config/routerBaseName";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import history from "../config/history";
import "./styles/paginationContainer.scss";

const PaginationContainer = (props) => {
  const toFirstPage = () => {
    history.push(`${ROUTER_BASENAME}issues?page=1`);
  };
  const toLastPage = () => {
    history.push(
      `${ROUTER_BASENAME}issues?page=${Math.floor(props.allIssues.length / 10)}`
    );
  };
  const handleClickPagination = (e, n) => {
    history.push(`${ROUTER_BASENAME}issues?page=${n}`);
  };

  return (
    <div className="pagination-container">
      <Button onClick={() => toFirstPage()}>最初</Button>
      <Pagination
        count={Math.floor(props.allIssues.length / 10)}
        page={props.pageNumber}
        color="primary"
        onChange={(e, n) => handleClickPagination(e, n)}
      />
      <Button onClick={() => toLastPage()}>最後</Button>
    </div>
  );
};

export default PaginationContainer;
