"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function TypeSignature({ signatureValue, items }: any) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [base64Image, setBase64Image] = useState("");
  const canvasRef = useRef<any>(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = `100px`;
    ctx.fillText(text, 10, 50);
    const dataUrl = canvas.toDataURL();
    setBase64Image(dataUrl);
    signatureValue(dataUrl, items);
  };

  return (
    <>
      <div className="p-5 d-flex gap-4 flex-column ">
        <div style={{ borderBottom: "1px solid black" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              fontSize: "20px",
              color: color,
              border: "none",
              width: "100%",
              outline: "none",
              background: "transparent",
              padding: "20px 10px",
            }}
            placeholder="Type your signature"
          />
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex gap-4">
            <label>Select Color:</label>
            <div
              style={{
                height: 24,
                width: 24,
                borderRadius: "50%",
                overflow: "hidden",
                padding: 0,
                margin: 0,
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
                  padding: 0,
                  margin: 0,
                  borderRadius: "50%",
                  appearance: "none", // this is important
                  WebkitAppearance: "none", // for Safari
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <p onClick={generateImage} className=" text-secondary">
            Save
          </p>
        </div>
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
