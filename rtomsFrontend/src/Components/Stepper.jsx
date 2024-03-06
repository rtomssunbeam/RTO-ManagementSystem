import React, { useState } from 'react';
import "./Stepper.css";
import { TiTick } from 'react-icons/ti';

const Stepper = () => {
    const steps = ['Personal Details', 'More Details', 'Documents', 'Payment'];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);

    return (
        <>
            <div className='flex justify-between'>
                {steps?.map((step, i) => (
                    <div key={i} className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"}`}>
                        <div className='step'>{i + 1 < currentStep || complete ? i + 1 : <TiTick size={24} />}</div>
                        <p className='text-grey-500'>{step}</p>
                    </div>
                ))}
            </div>
            <button className='btn' onClick={() => {
                currentStep === steps.length
                    ? setComplete(true)
                    : setCurrentStep((prev) => prev + 1);
            }}>
                {currentStep === steps.length ? 'Finish' : 'Next'}
            </button>
        </>
    );
};

export default Stepper;




// import React, { useState } from 'react';
// import "./Stepper.css";
// import {TiTick} from 'react-icons/ti';

// const Stepper = () => {

//     const steps = ['Personal Details', 'More Details', 'Documents', 'Payment'];
//     const [currentStep, setCurrentStep] = useState(1);
//     const [complete, setComplete] = useState(false);
//     return (
//         <>
//             <div className='flex justify-between'>
//                 {steps?.map((step, i) => (
//                     <div key={i} className={'step-item ${currentState === i + 1 && "active"} ${ (i + 1 < currentStep || complete) && "complete"} '}>
//                         <div className='step'>{i + 1 < currentStep || complete ? i + 1 : TiTick size={24} /}</div>
//                         <p className='text-grey-500'>{step}</p>
//                     </div>
//                 ))}

//             </div>
//             <button className='btn' onClick={() => {
//                 currentStep === steps.length
//                     ? setComplete(true)
//                     : setCurrentStep((prev) => prev + 1);
//             }}>
//                 {currentStep === steps.length ? 'Finish' : 'Next'}
//             </button>
//         </>
//     );
// };

// export default Stepper;
