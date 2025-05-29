"use client";
import React, { useState } from "react";
import { AiOutlineSignature } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ESignature from "@/compoments/E-Signature/E-signature";
import Image from "next/image";
import Signature from "@/public/img/signature/signature.jpeg";
import TypeSignature from "./typesignature";

function SignatureCompoment({
  signatureValue,
  items,
  label,
  formData,
  signatureData,
}: any) {
  const [toggle, setToggly] = useState(false);

  console.log(items, "itemsitemsitems");
  const signatureValueRepeat = formData?.find(
    (item: any) => item?.title === "Name"
  );

  const [show, setShow] = useState<any>();

  const handleClose = () => setShow(signatureValueRepeat.value ? true : false);
  const handleShow = () => setShow(true);

  // <Image src={signatureData?.url} layout="fill" objectFit="contain" />

  return (
    <>
      {signatureData?.url ? (
        <>
          <div
            className="py-4 d-flex flex-column "
            style={{
              width: "410px",
              height: "150px",
              cursor: "pointer",
              borderBottom: "1px dashed black",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="position-relative w-100 h-100  rounded p-2 bg-white">
              <Image
                src={signatureData.url}
                alt="Signature Preview"
                // className="img-fluid h-50 w-50 object-fit-contain"
                layout="fill"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="btn border-0 text-white px-3 py-2 rounded"
              style={{ backgroundColor: "#17635C" }}
              onClick={handleShow}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={handleShow}
          className="d-flex justify-content-center align-items-center"
          style={{
            border: "2px dashed #17635C40",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            width: window.innerWidth < 410 ? window.innerWidth - 40 : 410,
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
      )}

      {/* <Image
          src={Signature}
          width={80}
          height={80}
          alt="signature"
          objectFit="contain"
        /> */}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}> {label} </Modal.Title>
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
          <ESignature
            signatureValue={signatureValue}
            items={items}
            setShow={setShow}
          />
        ) : (
          <TypeSignature
            signatureValue={signatureValue}
            items={items}
            formData={formData}
            setShow={setShow}
          />
        )}
      </Modal>
    </>
  );
}

export default SignatureCompoment;
