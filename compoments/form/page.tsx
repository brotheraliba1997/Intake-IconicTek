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
import { stepLabels } from "@/constants/stepLabels";
import { Stepper } from "../Stepper/Stepper";

function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep <= 8) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(-1);
  };

  return (
    <>
      <div className="container mt-5">
        <Stepper steps={stepLabels} currentStep={currentStep} />

        <div className="mt-4">
          {currentStep === 0 && (
            <div>
              {/* <StandardRelease
              // rehta hai hamza
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
              /> */}

              <IndividualAbuse
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
              />
            </div>
          )}

          {currentStep === 1 && (
            <AuthorizationForMedication
              // rehta hai hamza
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 2 && (
            <SELFMANAGEMENT
              // done hai
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 3 && (
            <FUNDSANDPROPERTY
              // rehta hai hammad
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 4 && (
            <ADMISSIONFORM
              // rehta hai hamza
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 5 && (
            <IndividualAbuse
              // rehta hai hamza
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 6 && (
            <POLICYORIENTATIONRECEIPT
              // rehta hai hammad
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 7 && (
            <ResidencyAgreement
              // done hai ui rehti hai Shezad
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
          {currentStep === 8 && (
            <ServicesPlan
              handleNext={handleNext}
              handleBack={handleBack}
              currentStep={currentStep}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FormPage;
