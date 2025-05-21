import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Signature from "@/public/img/signature/signature.jpeg";
import Image from "next/image";

function ESignature({ signatureValue, items }: any) {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const handleSave = () => {
    const dataUrl = sigCanvasRef.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    signatureValue(dataUrl, items);
    console.log(dataUrl, "signature"); // yeh string hogi (base64 image)
  };

  const handleClear = () => {
    sigCanvasRef.current?.clear();
    setSignatureToggle(false);
  };

  const [signatureToggle, setSignatureToggle] = useState(false);

  return (
    <>
     <div className="d-flex justify-content-between flex-column gap-4">
      <div>
        <h6>Signature</h6>
        {signatureToggle ? (
          <div style={{ border: "1px solid #B1C5DD", borderRadius: "5px" }}>
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor="black"
              canvasProps={{ width: 500, height: 180, className: "sigCanvas" }}
            />
          </div>
        ) : (
          <div
            onClick={() => setSignatureToggle(true)}
            style={{
              border: "1px solid #B1C5DD",
              borderRadius: "5px",
              width: "500px",
              height: 180,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src={Signature}
              width={120}
              height={120}
              alt="signature"
              objectFit="contain"
            />
          </div>
        )}
      </div>

      <div className="d-flex gap-4">
        <button onClick={handleClear} type="button" className="btn btn-primary">
          Clear
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
