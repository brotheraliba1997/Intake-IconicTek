import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function ESignature() {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const handleSave = () => {
    const dataUrl = sigCanvasRef.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    console.log(dataUrl, "signature"); // yeh string hogi (base64 image)
  };

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-column gap-4">
       
        <div>
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{ width: 500, height: 100, className: "sigCanvas" }}
          />
        </div>

        <div className="d-flex gap-4">
          <button
            onClick={handleClear}
            type="button"
            className="btn btn-primary"
          >
            Clear Signature
          </button>
          <button onClick={handleSave} type="button" className="btn btn-dark">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default ESignature;
