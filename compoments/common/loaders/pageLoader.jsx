import React from "react";
import Image from "next/image";

function PageLoader() {
  return (
    <div className="card">
      <Image
        width="40%"
        className="mx-auto"
        src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
        alt="Loading..."
      />
    </div>
  );
}

export default PageLoader;
