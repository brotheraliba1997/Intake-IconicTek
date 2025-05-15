"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import SELFMANAGEMENT from "../intake/SelfManagement";
import AuthorizationForMedication from "../intake/AuthorizationForMedication";
import StandardRelease from "../intake/StandardRelease";
import FUNDSANDPROPERTY from "../intake/FundsAndProperty";
import ADMISSIONFORM from "../intake/AdmissionForm";
import IndividualAbuse from "../intake/IndividualAbuse";
import POLICYORIENTATIONRECEIPT from "../intake/PolicyOrientationReceipt";
import ResidencyAgreement from "../intake/ResidencyAgreement";
import ServicesPlan from "../intake/ServicesPlan";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import Formlist from "@/form";

const StepperComponent = dynamic(
  () => import("react-form-stepper").then((mod) => mod.Stepper),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const StepComponent = dynamic(
  () => import("react-form-stepper").then((mod) => mod.Step),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

function FormPage() {


  


  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep <= 8) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div className="container mt-5 ">
        <StepperComponent
          className="d-flex  justify-content-around"
          activeStep={currentStep}
          styleConfig={{
            activeBgColor: "#17635C",
            completedBgColor: "#3494FB",
          }}
        >
          <StepComponent label="Personal Info" />
          <StepComponent label="Contact Info" />
          <StepComponent label="Review" />
          <StepComponent label="Fund Sand Property" />
          <StepComponent label="Admission " />
          <StepComponent label="Individual Abuse " />
          <StepComponent label="Policy Orientation " />
          <StepComponent label="Residency Agreement " />
          <StepComponent label="Services Plan " />
        </StepperComponent>

        <div className="mt-4">
          {currentStep === 0 && (
            <div>
              <StandardRelease handleNext={handleNext} handleBack={handleBack} currentStep={currentStep}  />
              {/* <ServicesPlan /> */}
            </div>
          )}

          {currentStep === 1 && <AuthorizationForMedication handleNext={handleNext} handleBack={handleBack} currentStep={currentStep} />} 
          {currentStep === 2 && <SELFMANAGEMENT handleNext={handleNext} handleBack={handleBack} currentStep={currentStep}  />}
          {currentStep === 3 && <FUNDSANDPROPERTY />}
          {currentStep === 4 && <ADMISSIONFORM />}
          {currentStep === 5 && <IndividualAbuse />}
          {currentStep === 6 && <POLICYORIENTATIONRECEIPT />} 
          {currentStep === 7 && <ResidencyAgreement />}
          {currentStep === 8 && <ServicesPlan />}
        </div>

        
      </div>
    </>
  );
}

export default FormPage;
