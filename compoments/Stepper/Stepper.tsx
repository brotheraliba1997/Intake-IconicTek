import React from "react";
import { FaCheck } from "react-icons/fa";

interface StepperProps {
  steps: {
    label: string;
  }[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const formatLabel = (label: string) => {
    // Split words and add line break for better formatting
    const words = label.split(" ");
    if (words.length > 1) {
      const midpoint = Math.ceil(words.length / 2);
      return (
        <>
          {words.slice(0, midpoint).join(" ")}
          <br />
          {words.slice(midpoint).join(" ")}
        </>
      );
    }
    return label;
  };

  return (
    <div className={`container card py-4 rounded shadow-lg`}>
      <div className="d-flex align-items-center justify-content-center w-100 stepper-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="d-flex flex-column align-items-center step-item">
              <div className="circle-container">
                {/* Connector Line - Moved before circle */}
                {index > 0 && (
                  <div className="line-wrapper">
                    <div
                      className={
                        index <= currentStep
                          ? "stepper-line-active"
                          : "stepper-line-inactive"
                      }
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle ${
                    index <= currentStep ? "stepper-active" : "stepper-inactive"
                  }`}
                  style={{ width: "35px", height: "35px" }}
                >
                  {index < currentStep ? (
                    <FaCheck size={14} className="text-white" />
                  ) : (
                    <div
                      className={`rounded-circle ${
                        index === currentStep ? "bg-white" : "border-circle"
                      }`}
                      style={{ width: "8px", height: "8px" }}
                    />
                  )}
                </div>
              </div>

              {/* Label */}
              <div className="label-container">
                <span
                  className={`step-label text-center ${
                    index <= currentStep ? "stepper-text-active" : "text-muted"
                  }`}
                >
                  {formatLabel(step.label)}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`
        .stepper-container {
          gap: 0;
          position: relative;
          padding: 0 20px;
        }
        .step-item {
          min-width: 110px;
          max-width: 130px;
          position: relative;
        }
        .circle-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .label-container {
          margin-top: 12px;
          min-height: 32px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .step-label {
          font-size: 11px;
          line-height: 1.3;
          font-weight: 500;
          display: block;
        }
        .stepper-active {
          background: #1caa9e;
          border: none;
          position: relative;
          z-index: 2;
        }
        .stepper-inactive {
          background: white;
          border: 2px solid #d9d9d9;
          position: relative;
          z-index: 2;
        }
        .border-circle {
          background: #d9d9d9;
        }
        .stepper-text-active {
          color: #1caa9e;
        }
        .line-wrapper {
          position: absolute;
          width: 100%;
          left: -50%;
          display: flex;
          align-items: center;
        }
        .stepper-line-active,
        .stepper-line-inactive {
          height: 2px;
          width: 100%;
        }
        .stepper-line-active {
          background: #1caa9e;
        }
        .stepper-line-inactive {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
