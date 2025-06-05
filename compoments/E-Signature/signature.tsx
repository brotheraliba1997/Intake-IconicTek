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

  // const handleClose = () => setShow(signatureValueRepeat.value ? true : false);
  const [text, setText] = useState(signatureValueRepeat?.value ?? "");
  const handleShow = () => setShow(true);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);

        if (text === "") {
          // setBase64Image(dataUrl);
          signatureValue("", items);
        }
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, text]);

  useEffect(() => {
    if (signatureValueRepeat?.value) {
      setText(signatureValueRepeat?.value);
    }
  }, [signatureValueRepeat?.value]);

  console.log(signatureValueRepeat?.value, "signatureValueRepeat?.value");

  const [loading, setLoading] = useState(false);

  console.log(loading, "generateImage");
  return (
    <>
      <div ref={wrapperRef} style={{ position: "relative" }}>
        {signatureData?.url ? (
          <>
            <div
              style={{
                backgroundColor: "	rgb(219, 240, 236)",
                width: "400px",
                border: "1px solid rgb(49, 155, 146) ",
                opacity: 1,
                height: 120,
                borderRadius: "5px",
              }}
              onClick={handleShow}
            >
              <div
                className="d-flex justify-content-end"
                style={{ fontSize: "22px", color: "red" }}
              >
                {" "}
                *
              </div>
              <div
                style={{ display: "flex", alignItems: "center", height: "50%" }}
              >
                <div
                  className="position-relative "
                  style={{ width: "100%", height: "80px" }}
                >
                  <Image
                    // onLoad={() => setLoading(false)}
                    src={signatureData.url}
                    alt="Signature Preview"
                    layout="fill"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
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

              {loading ? (
                "loading"
              ) : (
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  Add your signature
                </span>
              )}
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

              {/* <p className="px-4 py-0">Case manager*</p> */}
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
                  text={text}
                  setText={setText}
                  loading={loading}
                  setLoading={setLoading}
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
