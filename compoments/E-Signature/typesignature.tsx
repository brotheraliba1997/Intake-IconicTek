"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import signatureImage from "@/public/img/signature/test.jpeg";
import { FaAngleRight } from "react-icons/fa";

export default function TypeSignature({
  signatureValue,
  items,
  formData,
  setShow,
  text,
  setText,
}: any) {
  const [color, setColor] = useState("#000000");
  const [base64Image, setBase64Image] = useState("");
  const [selectedFont, setSelectedFont] = useState("");

  console.log(formData, "formData");

  console.log(selectedFont, "selectedFont");

  const fonts = [
    { label: "Shadows Into Light", className: "font-shadows" },
    { label: "Yellowtail", className: "font-yellowtail" },
    { label: "Dancing Script", className: "font-dancing" },
    { label: "Great Vibes", className: "font-greatvibes" },
  ];

  const [isEditing, setIsEditing] = useState(false);

  console.log(text, "useState");

  const canvasRef = useRef<any>(null);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (text !== undefined && text !== "") {
  //     generateImage(); // trigger actual logic after delay
  //     // toast.success("Signature save successfully");
  //     }
  //   }, 500); // 500ms delay

  //   return () => {
  //     clearTimeout(handler); // clear previous timeout if input changes before 500ms
  //   };
  // }, [text]);

  const generateImage = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = 10;
    const fontSize = 10;
    const paddingY = 5;
    const paddingX = 0;
    await document.fonts.load;
    ctx.font = `${fontSize}px ${selectedFont ? selectedFont : "Arail"}`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight =
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent;
    canvas.width = (textWidth + paddingX * 2) * scale;
    canvas.height = (textHeight + paddingY * 2) * scale;
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${selectedFont ? selectedFont : "Arail"}`;

    ctx.fillText(
      text,
      paddingX,
      paddingY + textMetrics.actualBoundingBoxAscent
    );

    const dataUrl = canvas.toDataURL();
    setBase64Image(dataUrl);
    signatureValue(dataUrl, items);
  };

  console.log(base64Image, "base64Image");

  return (
    <>
      <div
        className="px-2  d-flex  flex-column justify-content-end"
        style={{ minHeight: "220px" }}
      >
        <div className="d-flex justify-content-center align-items-center text-center">
          {text === "" && !isEditing ? (
            <div
              className="position-relative"
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer", height: 150, width: 300 }}
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
                fontFamily: selectedFont,
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

          <div className="col-lg-5">
            <Form.Select
              style={{ fontSize: "14px", backgroundColor: "#ECECEC" }}
              className={`py-2 ${selectedFont}`}
              aria-label="Font selector"
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              <option value="">Change Style</option>
              {fonts.map((font, index) => (
                <option
                  key={index}
                  value={font.label}
                  style={{ fontFamily: font.label }}
                >
                  {font.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>

      <div className="border-top d-flex justify-content-end py-2 px-2">
        <Button
          onClick={() => {
            if (text === "") {
              // setBase64Image(dataUrl);
              signatureValue("", items);
              setShow(false);

              return;
            }
            generateImage();
            setShow(false);
            toast.success("Signature save successfully");
          }}
          style={{ backgroundColor: "#17635C" }}
        >
          Next <FaAngleRight />
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        style={{ display: "none" }}
      />
    </>
  );
}
