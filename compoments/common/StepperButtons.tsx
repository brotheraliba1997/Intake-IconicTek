import React from "react";

interface StepperButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNavigate: (direction: "back" | "next" | "submit") => void;
}

const StepperButtons: React.FC<StepperButtonsProps> = ({
  currentStep,
  totalSteps,
  onNavigate,
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="d-flex justify-content-between mt-4 pb-5">
      {" "}
      <button
        className="btn btn-secondary"
        onClick={() => onNavigate("back")}
        disabled={currentStep <= 0}
      >
        Back
      </button>
      {!isLastStep ? (
        <button
          className="btn"
          onClick={() => onNavigate("next")}
          style={{ backgroundColor: "#00A5A8", color: "white" }}
        >
          Next
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => onNavigate("submit")}
          style={{ backgroundColor: "#00A5A8", color: "white" }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default StepperButtons;
