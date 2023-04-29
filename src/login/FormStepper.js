import React, { useState } from "react";
// import forms
import { BasicForm } from "./forms/BasicForm";

//arrow icon
import EastIcon from "@mui/icons-material/East";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import material ui dependencies
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//
import tw from 'twin.macro'
import { useForm, FormProvider } from "react-hook-form";
import { FarmInformationForm } from "./forms/FarmInformationForm";

function getSteps({ content }) {
  return [content.BasicInformation, content.farmInformation];
}
function handleInputs(handle) {
  console.log(handle);
}

const LinaerStepper = ({ content }) => {
  //default inputs
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
    },
  });
  //if step is failed
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps({ content });

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    // console.log(data);
    if (activeStep === steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = (newStep) => {
    setActiveStep(activeStep - newStep);
    // stepsContainer(activeStep,{content})
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  const stepsContainer = (step, { content }) => {
    switch (step) {
      case 0:
        return (
          <>
          
          <BasicForm
            activeStep={step}
            steps={getSteps}
            onClick={handleInputs}
            content={content}
          />

          </>
        );
      case 1:
        return (
          <FarmInformationForm
            OnChange={handleBack}
            activeStep={step}
            content={content}
          />
        );
      default:
        return "unknown step";
    }
  };
  const H1 = tw.div` text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`;
const Center = tw.div`grid items-center justify-center `;
  return (
    <div dir={content.dir}>
      <Center>
          <H1>Sign up and join our collaborations</H1>
        </Center>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <>
                
                <Typography
                  variant="caption"
                  align="center"
                  style={{
                    display: "block",
                  }}
                >
                  {content.optional}
                </Typography>
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              </>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          {content.ThankYou}
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {stepsContainer(activeStep, { content })}
              {/*here*/}
              {/* {isStepOptional(activeStep) && (
                <Button
                style={{marginRight:"20px"}}
                dir={content.dir}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >

                  {content.skip}
                </Button>
                
              )} */}
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
