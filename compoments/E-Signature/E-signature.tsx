import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Signature from "@/public/img/signature/signature.jpeg";
import Image from "next/image";
import { toast } from "react-hot-toast";

function ESignature({ signatureValue, items, setShow }: any) {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [penColor, setPenColor] = useState("#000000");

  const handleSave = () => {
    const canvas = sigCanvasRef.current;
    if (canvas && !canvas.isEmpty()) {
      const dataUrl = canvas.getTrimmedCanvas().toDataURL("image/png");
      toast.success("Signature saved successfully");
      signatureValue(dataUrl, items);
      setShow(false);
    } else {
      toast.error("Signature canvas is empty");
    }
  };

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  return (
    <>
      <div className="p-4 d-flex justify-content-between flex-column gap-2">
        <div>
          <div
            style={{ borderBottom: "3px solid #B1C5DD", borderRadius: "5px" }}
          >
            <SignatureCanvas
              ref={sigCanvasRef}
              // onEnd={() => handleSave()}
              penColor={penColor}
              canvasProps={{
                className: "signature-canvas",
                width: window.innerWidth < 410 ? window.innerWidth - 40 : 410,
                height: 180,
              }}
            />
          </div>
        </div>

        <div className="d-flex gap-4"></div>

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
            </div>
          </div>

          <div className="d-flex gap-4">
            <p
              onClick={handleClear}
              className=" text-secondary"
              style={{ cursor: "pointer" }}
            >
              Clear
            </p>
            <p
              onClick={handleSave}
              style={{ color: "#17635C", cursor: "pointer" }}
            >
              Save
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ESignature;
