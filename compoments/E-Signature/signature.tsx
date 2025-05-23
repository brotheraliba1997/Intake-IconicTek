"use client";
import React, { useState } from "react";
import { AiOutlineSignature } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ESignature from "@/compoments/E-Signature/E-signature";
import Image from "next/image";
import Signature from "@/public/img/signature/signature.jpeg";
import TypeSignature from "./typesignature";

function SignatureCompoment({ signatureValue, items, label, formData }: any) {
  const [toggle, setToggly] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        onClick={handleShow}
        className="d-flex justify-content-center align-items-center"
        style={{
          border: "2px dashed #17635C40",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          width: window.innerWidth < 500 ? window.innerWidth - 40 : 500,
          height: 120,
          cursor: "pointer",
          transition: "all 0.2s ease",
          position: "relative",
          background: "#fafafa",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.border = "2px dashed #17635C";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#fafafa";
          e.currentTarget.style.border = "2px dashed #17635C40";
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#17635C",
          }}
        >
          <AiOutlineSignature size={22} />

          <span
            style={{
              fontSize: "15px",
              fontWeight: 400,
            }}
          >
            Add your signature
          </span>
        </div>
      </div>

      {/* <Image
          src={Signature}
          width={80}
          height={80}
          alt="signature"
          objectFit="contain"
        /> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {label} </Modal.Title>
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
          <TypeSignature signatureValue={signatureValue} items={items} formData={formData} />
        )}
      </Modal>
    </>
  );
}

export default SignatureCompoment;
