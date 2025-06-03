"use client";
import Image from "next/image";
// import React, { useEffect } from "react";
import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import Card from "react-bootstrap/Card";
import { MdCancel } from "react-icons/md";

function page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.innerHeight);
    }
  }, []);

  const [toggle, setToggly] = useState(false);

  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [penColor, setPenColor] = useState("#000000");

  const handleSave = () => {
    const canvas = sigCanvasRef.current;
    if (canvas && !canvas.isEmpty()) {
      const dataUrl = canvas.getTrimmedCanvas().toDataURL("image/png");
      // toast.success("Signature saved successfully");
      // signatureValue(dataUrl, items);
      // setShow(false);
    } else {
      // toast.error("Signature canvas is empty");
    }
  };
  return (
    <>
      <div
        // onClick={handleShow}

        className="d-flex justify-content-center align-items-center mx-4"
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
          {/* <AiOutlineSignature size={22} /> */}

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

      <Card
        className="mx-4"
        style={{
          width: "400px",
        }}
      >
        <div className="d-flex justify-content-end px-2 py-2">
          {" "}
          <MdCancel style={{ fontSize: "24px" }} />
        </div>
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
          <>
            <div className="p-4 d-flex justify-content-between flex-column gap-2 ">
              <div>
                <div
                  style={{
                    borderBottom: "3px solid #B1C5DD",
                    borderRadius: "5px",
                  }}
                >
                  <SignatureCanvas
                    ref={sigCanvasRef}
                    // onEnd={() => handleSave()}
                    penColor={penColor}
                    canvasProps={{
                      className: "signature-canvas",
                      width:
                       400,
                      height: 120,
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
                    // onClick={handleClear}
                    className=" text-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    Clear
                  </p>
                  <button
                    onClick={handleSave}
                    className="bg-primary"
                    style={{ color: "white", cursor: "pointer" }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              className="p-5 d-flex gap-4 flex-column  "
              
            >
              <div style={{ borderBottom: "1px solid black" }}>
                <input
                  type="text"
                  // value={text}
                  required
                  // onChange={(e) => setText(e.target.value)}
                  style={{
                    fontSize: "20px",
                    // color: color,
                    border: "none",
                    width: "100%",
                    outline: "none",
                    background: "transparent",
                    padding: "40px 10px",
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
                      // value={color}
                      // onChange={(e) => setColor(e.target.value)}
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

                {/* <p onClick={generateImage} className=" text-secondary " style={{ cursor: "pointer" }}>
            Save
          </p> */}
              </div>
            </div>
            <canvas
              // ref={canvasRef}
              width={400}
              height={200}
              style={{ display: "none" }}
            />{" "}
          </>
        )}
      </Card>
    </>
  );
}

export default page;
