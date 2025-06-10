import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Signature from "@/public/img/signature/signature.jpeg";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/esm/Button";
import { FaAngleRight } from "react-icons/fa";
import signatureImage from "@/public/img/signature/test.jpeg";

function ESignature({ signatureValue, items, setShow, questionId }: any) {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [penColor, setPenColor] = useState("#000000");

  const handleSave = () => {
    const canvas = sigCanvasRef.current;
    if (canvas && !canvas.isEmpty()) {
      const dataUrl = canvas.toDataURL("image/png");
      toast.success("Signature saved successfully");
      signatureValue(dataUrl, items , questionId);
      setShow(false);
    } else {
      toast.error("Signature is empty");
    }
  };

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className=" d-flex justify-content-between flex-column">
        <div>
          <div className="px-4" style={{ borderBottom: "1px solid #B1C5DD" }}>
            {!isEditing ? (
              <div
                className="position-relative"
                onClick={() => setIsEditing(true)}
                style={{ cursor: "pointer", height: 131, width: "100%" }}
              >
                <Image
                  src={signatureImage}
                  layout="fill"
                  style={{ objectFit: "contain" }}
                  alt="signature type"
                />
              </div>
            ) : (
              <SignatureCanvas
                ref={sigCanvasRef}
                // onEnd={() => handleSave()}
                penColor={penColor}
                canvasProps={{
                  className: "signature-canvas",
                  width: 400,
                  height: 120,
                }}
              />
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between px-2 pt-3 pb-1">
          <div className="d-flex gap-4 ">
            <label>Select Color:</label>

            {/* <div
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
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
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
            </div> */}


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
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
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

          <p
            onClick={() => {
              handleClear();
              setIsEditing(false);
            }}
            className="p-0 m-0 text-secondary"
            style={{ cursor: "pointer" }}
          >
            Clear
          </p>
        </div>

        <div className="border-top d-flex justify-content-end py-2 px-2">
          <Button
          type="button"
            onClick={() => {
              handleSave();
            }}
            style={{ backgroundColor: "#17635C" }}
          >
            Next <FaAngleRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ESignature;
