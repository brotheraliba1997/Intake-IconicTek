import Image from "next/image";
import React from "react";

type Props = {};

const HospitalLogo = (props: Props) => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ maxWidth: "300px", margin: "5px auto 20px" }}
    >
      <Image
        src="/img/hsLogo.png"
        width={200}
        height={80}
        alt="name of hospital"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default HospitalLogo;
