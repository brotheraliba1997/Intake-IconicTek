"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

function DotsLoader({
  dark,
  size,
  height,
}: {
  dark?: boolean;
  size?: number;
  height?: string;
}) {
  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center"
      style={{ height: height ? height : "60vh" }}
    >
      <div className="react-loader-spinner">
        <ThreeDots
          height={size ? size : "27"}
          width={size ? size : "27"}
          radius="9"
          color={dark ? "#000" : "#00a699"}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          // wrapperClassName={
          //   "react-loader-spinner justify-content-center align-items-center"
          // }
          visible={true}
        />
      </div>
    </div>
  );
}

export default DotsLoader;
