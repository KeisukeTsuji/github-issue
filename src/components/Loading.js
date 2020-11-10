import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../recoil/atoms";
import "./styles/Loading.css";

const Loading = () => {
  const loading = useRecoilValue(loadingState);

  return (
    <Fragment>
      {(() => {
        if (loading) {
          return (
            <div className="mask">
              <i className="loader">Loading...</i>
            </div>
          );
        }
      })()}
    </Fragment>
  );
};

export default Loading;
