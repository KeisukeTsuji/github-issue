import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../recoil/atoms";

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
      <style>{`
        .mask {
          background: #ffffff;
          opacity: 0.7;
          position: absolute;
          width: 100vw;
          height: calc(100vh - 80px);
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loader,
        .loader:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
        }
        .loader {
          margin: 60px auto;
          font-size: 10px;
          position: relative;
          text-indent: -9999em;
          border-top: 1.1em solid rgba(255, 255, 255, 0.2);
          border-right: 1.1em solid rgba(255, 255, 255, 0.2);
          border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
          border-left: 1.1em solid #33ADFF;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.1s infinite linear;
          animation: load8 1.1s infinite linear;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Loading;