"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import signatureImage from "@/public/img/signature/test.jpeg";

export default function TypeSignature({
  signatureValue,
  items,
  formData,
  setShow,
}: any) {
  const [color, setColor] = useState("#000000");
  const [base64Image, setBase64Image] = useState("");

  console.log(formData, "formData");

  const signatureValueRepeat = formData?.find(
    (item: any) => item?.title === "Name" || item?.title === "Persons Name:"
  );

  const [text, setText] = useState(signatureValueRepeat?.value);
  const [isEditing, setIsEditing] = useState(false);

  console.log(text, "useState");

  const canvasRef = useRef<any>(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    const scale = 2;
    canvas.width = 150 * scale;
    canvas.height = 30 * scale;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = "24px Arial";
    ctx.fillText(text, 10, 50);
    const dataUrl = canvas.toDataURL();
    if (text !== undefined && text !== "") {
      toast.success("Signature save successfully");
      setBase64Image(dataUrl);
      signatureValue(dataUrl, items);

      setShow(false);
    } else {
      toast.error("Signature value Missing");
    }
  };

  console.log(signatureValue, "signatureValue");

  return (
    <>
      <div
        className="px-2  d-flex  flex-column justify-content-end"
        style={{ minHeight: "220px" }}
      >
        <div
          className="d-flex justify-content-center align-items-center text-center"
          
        >
          {text === "" && !isEditing ? (
            <div
              className="position-relative"
              
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer" , height: 150, width: 300 }}
            >
              <Image
                src={signatureImage}
                layout="fill"
                style={{ objectFit: "contain" }}
                alt="signature type"
              />
            </div>
          ) : (
            <input
              type="text"
              value={text}
              autoFocus
              required
              onChange={(e) => setText(e.target.value)}
              onBlur={() => {
                if (text.trim() === "") setIsEditing(false);
              }}
              style={{
                fontSize: "40px",
                color: color,
                border: "none",
                width: "100%",
                outline: "none",
                background: "transparent",
                padding: "10px 20px 40px 0px",
                textAlign: "center",
              }}
            />
          )}
        </div>

        <div style={{ borderBottom: "2px solid rgb(151, 151, 151)" }}></div>

        <div className="row px-2 py-3 g-3 align-items-center">
          {/* Left Column: Color Pickers */}
          <div className="col-lg-7 d-flex align-items-center gap-3 flex-wrap">
            <p className="mb-0 me-2">Select Color:</p>

            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                style={{
                  height: 13,
                  width: 13,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "none",
                    borderRadius: "50%",
                    appearance: "none",
                    WebkitAppearance: "none",
                    cursor: "pointer",
                    padding: 0,
                    margin: 0,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right Column: Dropdown */}
          <div className="col-lg-5">
            <Form.Select
              style={{ fontSize: "14px", backgroundColor: "#ECECEC" }}
              className="py-2"
              aria-label="Default select example"
            >
              <option style={{ fontSize: "14px" }}>Change Style</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
        </div>
      </div>

      <div className="border-top d-flex justify-content-end py-2 px-2">
        {/* <p  className=" text-secondary " style={{ cursor: "pointer" }}>
            
          </p> */}
        <Button onClick={generateImage} style={{ backgroundColor: "#17635C" }}>
          Sign & Complete{" "}
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        style={{ display: "none" }}
      />

      {/* {base64Image && (
        <div>
          <h4>Generated Signature:</h4>
          <Image
            width={200}
            height={200}
            src={base64Image}
            alt="Typed Signature"
          />
        </div>
      )} */}
    </>
  );
}
