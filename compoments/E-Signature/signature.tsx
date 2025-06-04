"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSignature } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ESignature from "@/compoments/E-Signature/E-signature";
import Image from "next/image";
import Signature from "@/public/img/signature/signature.jpeg";
import TypeSignature from "./typesignature";
import Card from "react-bootstrap/Card";
import { MdCancel } from "react-icons/md";

function SignatureCompoment({
  signatureValue,
  items,
  label,
  formData,
  signatureData,
}: any) {
  const [toggle, setToggly] = useState(false);

  
  const wrapperRef = useRef(null);

  console.log(items, "itemsitemsitems");
  const signatureValueRepeat = formData?.find(
    (item: any) => item?.title === "Name" || item?.title === "Persons Name:"
  );

  const [show, setShow] = useState<any>();

  const handleClose = () => setShow(signatureValueRepeat.value ? true : false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <div ref={wrapperRef} style={{ position: "relative" }}>
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
            onClick={() => setShow(true)}
            className="d-flex justify-content-center align-items-center"
            style={{
              border: "2px dashed #17635C40",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              width: "420px",
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

        {show && (
          <div className="position-relative">
            <Card
              className="shadow-lg "
            
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                zIndex: 10,
                width: "400px",
                border: "1px solid #B9BBD1",
              }}
            >
              <div
                className="d-flex justify-content-end px-2 py-1"
                onClick={() => setShow(false)}
              >
                {" "}
                <MdCancel style={{ fontSize: "24px" }} />
              </div>

              <p className="px-4 py-0">Case manager*</p>
              <div className="d-flex justify-content-center align-items-center ">
                <div
                  onClick={() => setToggly(false)}
                  style={{
                    border: "1px solid #346CFC",
                    background: toggle ? "white  " : "#346CFC",
                    padding: "3px 12px",
                    color: toggle ? "#346CFC" : " white",
                    borderRadius: "5px 0px 0px 5px",
                    cursor: "pointer",
                  }}
                >
                  Type
                </div>

                <div
                  onClick={() => setToggly(true)}
                  style={{
                    border: " 1px solid #346CFC",
                    background: toggle ? " #346CFC" : "white",
                    padding: "3px 12px",
                    color: toggle ? "white" : "#346CFC",
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
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default SignatureCompoment;
