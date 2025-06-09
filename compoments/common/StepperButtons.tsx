import React from "react";
import Spinner from "react-bootstrap/Spinner";
interface StepperButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNavigate: (direction: "back" | "next" | "submit") => void;
  isLoading: boolean;
}

const StepperButtons: React.FC<StepperButtonsProps> = ({
  currentStep,
  totalSteps,
  onNavigate,
  isLoading,
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="d-flex justify-content-end mt-4 pb-5">
      {" "}
      {/* <button
        className="btn btn-secondary"
        onClick={() => onNavigate("back")}
        disabled={currentStep <= 0}
      >
        Back
      </button> */}
      {!isLastStep ? (
        <button
          className="btn px-3 py-2"
          type="submit"
          onClick={() => onNavigate("next")}
          style={{ backgroundColor: "#00A5A8", color: "white" }}
        >
          {isLoading ? <Spinner animation="border" /> : "Next"}
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
