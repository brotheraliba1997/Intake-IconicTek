"use client";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ESignature from "@/compoments/E-Signature/E-signature";
import Image from "next/image";
import Signature from "@/public/img/signature/signature.jpeg";
import TypeSignature from "./typesignature";

function SignatureCompoment({ signatureValue, items }: any) {
  const [toggle, setToggly] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        onClick={handleShow}
        style={{
          border: "1px solid #B1C5DD",
          borderRadius: "5px",
          width: window.innerWidth < 500 ? window.innerWidth - 40 : 500,
          height: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Image
          src={Signature}
          width={80}
          height={80}
          alt="signature"
          objectFit="contain"
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Landlord/Lessor </Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-center align-items-center py-4">
          <div
            onClick={() => setToggly(false)}
            style={{
              border: "1px solid blue",
              background: toggle ? " blue " : "white",
              padding: "5px 20px",
              color: toggle ? "white" : " blue",
              borderRadius: "5px 0px 0px 5px",
              cursor: "pointer",
            }}
          >
            Type
          </div>

          <div
            onClick={() => setToggly(true)}
            style={{
              border: " 1px solid blue",
              background: toggle ? "white" : "blue",
              padding: "5px 20px",
              color: toggle ? "blue" : "white",
              borderRadius: "0px 5px 5px 0px",
              cursor: "pointer",
            }}
          >
            Draw
          </div>
        </div>

        {toggle ? (
          <ESignature signatureValue={signatureValue} items={items} />
        ) : (
          <TypeSignature signatureValue={signatureValue} items={items} />
        )}
      </Modal>
    </>
  );
}

export default SignatureCompoment;
