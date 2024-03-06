// FinalForm.jsx
import React, { useState } from 'react';
import StepOne from './FormStepOne';
import StepTwo from './FormStepTwo';
import StepFinal from './FormStepFinal';

const FinalForm = () => {
  const [step, setStep] = useState(1);
  const [stepOneFields, setStepOneFields] = useState({
    f_one_s_one: '',
    f_two_s_one: '',
  });
  const [stepTwoFields, setStepTwoFields] = useState({
    f_one_s_two: '',
    f_two_s_two: '',
  });
  const [stepFinalFields, setStepFinalFields] = useState({
    f_one_s_final: '',
    f_two_s_final: '',
  });
  const [showFinalValues, setShowFinalValues] = useState(false);

  const handleNextButton = () => {
    setStep(step + 1);
  };

  const handleBackButton = () => {
    setStep(step - 1);
  };

  const handleConfirmButton = (values) => {
    setStep(step + 1);
    // console.log('Confirm button clicked:', values);
    setStepFinalFields({
      ...stepFinalFields,
      ...values,
    });
    setShowFinalValues(true);    
//   console.log('Updated State:', stepFinalFields, showFinalValues);
  };

// const handleConfirmButton = (values) => {
//     setStepFinalFields({
//       ...stepFinalFields,
//       ...values,
//     });
  
//     setShowFinalValues(true);
  
//     // Log the updated state in the callback function
//     setStepFinalFields((updatedFields) => {
//       console.log('Updated State:', updatedFields);
//     });
//   };
  

  const getFinalStepValue = (values) => {
    setStepFinalFields({
      ...stepFinalFields,
      ...values,
    });
  };

  const getStepOneValue = (values) => {
    setStepOneFields({
      ...stepOneFields,
      ...values,
    });
  };

  const getStepTwoValue = (values) => {
    setStepTwoFields({
      ...stepTwoFields,
      ...values,
    });
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1>STEP 1</h1>
          <StepOne {...stepOneFields} handleNextButton={handleNextButton} submittedValues={getStepOneValue} />
        </div>
      )}
      {step === 2 && (
        <div>
          <h1>STEP 2</h1>
          <StepTwo {...stepTwoFields} handleNextButton={handleNextButton} handleBackButton={handleBackButton} submittedValues={getStepTwoValue} />
        </div>
      )}
      {step === 3 && (
  <div>
    <h1>FINAL STEP</h1>
    <StepFinal {...stepFinalFields} handleConfirmButton={handleConfirmButton} handleBackButton={handleBackButton} submittedValues={getFinalStepValue} />
  </div>
)}

      {step === 4 && (
        <div>
          <h1>Confirmation</h1>
          {showFinalValues && (
            <p>
              STEP ONE VALUES: <br />
              F1: {stepOneFields.f_one_s_one}
              <br /> F2: {stepOneFields.f_two_s_one}
              <br />
              STEP TWO VALUES: <br />
              F1: {stepTwoFields.f_one_s_two}
              <br /> F2: {stepTwoFields.f_two_s_two}
              <br />
              FINAL STEP VALUES: <br />
              F1: {stepFinalFields.f_one_s_final}
              <br /> F2: {stepFinalFields.f_two_s_final}
              <br />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FinalForm;
