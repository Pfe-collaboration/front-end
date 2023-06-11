import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { liste } from "./state, region, zipCode List/TunisiaList";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import axios from "axios";

function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Address Information",
    "Payment",
  ];
}
const BasicForm = () => {
  const { control } = useFormContext();
  const [WrongName, setWrongName] = useState(null);
  const [WrongLastName, setWrongLastName] = useState(null);
  const [WrongPwd, setWrongPwd] = useState(null);
  const [strenght, setStrength] = useState(null);
  const [Pwd, setPwd] = useState("");
  //verify name function
  function NameVerify(name) {
    if (!/^[a-zA-Z ]+$/.test(name.target.value)) {
      setWrongName(true);
    } else {
      setWrongName(false);
    }
  }
  function LastNameVerify(name) {
    if (!/^[a-zA-Z ]+$/.test(name.target.value)) {
      setWrongLastName(true);
    } else {
      setWrongLastName(false);
    }
  }
  //function to verify password stength
  function checkPasswordStrength(e) {
    const password = e.target.value;
    if (password.length < 8) {
      setStrength(true);
    } else if (
      password.length >= 8 &&
      password.match(/[a-z]/) &&
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[^a-zA-Z0-9]/)
    ) {
      setStrength(false);
      setPwd(password);
    } else {
      setStrength(false);
      setPwd(password);
    }
  }
  //handle repeat pwd
  function rpwd(rpwd) {
    if (rpwd.target.value === Pwd) {
      setWrongPwd(false);
    } else {
      setWrongPwd(true);
    }
  }

  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            {...field}
            onBlur={NameVerify}
          />
        )}
      />
      {WrongName ? (
        <span style={{ color: "red" }}>
          please fill in with your real name{" "}
        </span>
      ) : (
        <></>
      )}

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            {...field}
            onBlur={LastNameVerify}
          />
        )}
      />
      {WrongLastName ? (
        <span style={{ color: "red" }}>
          please fill in with your real last name{" "}
        </span>
      ) : (
        <></>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            id="password"
            label="password"
            variant="outlined"
            placeholder="Enter Your password"
            type="password"
            fullWidth
            margin="normal"
            {...field}
            onBlur={checkPasswordStrength}
          />
        )}
      />
      {strenght ? (
        <span style={{ color: "red" }}>
          you password is weak it needs to contain uppercase letters and
          symboles{" "}
        </span>
      ) : (
        <></>
      )}

      <Controller
        control={control}
        name="Repeatpassword"
        render={({ field }) => (
          <TextField
            id="Repeatpassword"
            label="Confirm Your password"
            variant="outlined"
            placeholder="Confirm Your password "
            fullWidth
            type="password"
            margin="normal"
            {...field}
            onBlur={rpwd}
          />
        )}
      />
      {WrongPwd ? (
        <span style={{ color: "red" }}>verify your password</span>
      ) : (
        <></>
      )}
      <pre></pre>
    </>
  );
};

//contact form
const ContactForm = () => {
  //email verification boolean
  const [WrongEmail, setWrongEmail] = useState(null);
  //function that verifies name
  function EmailVerify(email) {
    const mail = email.target.value;
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      setWrongEmail(true);
    } else {
      setWrongEmail(false);
    }
  }
  //handlephone number
  const [WrongPhone, setWrongPhone] = useState(null);
  const [WrongAlternate, setWrongAlternate] = useState(null);
  function isValidTunisianPhoneNumber(phoneNumber) {
    const phone = phoneNumber.target;
    // Regular expression for Tunisian phone number
    const phoneRegex = /^(\+216)?(2|4|5|9)\d{7}$/;

    if (phoneRegex.test(phone.value)) {
      if (phone.name === "phoneNumber") {
        setWrongPhone(false);
      } else {
        setWrongAlternate(false);
      }
    } else {
      if (phone.name === "phoneNumber") {
        setWrongPhone(true);
      } else {
        setWrongAlternate(true);
      }
    }
  }

  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
            onBlur={EmailVerify}
          />
        )}
      />

      {WrongEmail ? <span style={{ color: "red" }}>invalid Email</span> : <></>}
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
            onBlur={isValidTunisianPhoneNumber}
          />
        )}
      />
      {WrongPhone ? (
        <span style={{ color: "red" }}>invalid phone number</span>
      ) : (
        <></>
      )}
      <Controller
        control={control}
        name="alternatePhone"
        render={({ field }) => (
          <TextField
            id="alternate-phone"
            label="Alternate Phone"
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            {...field}
            onBlur={isValidTunisianPhoneNumber}
          />
        )}
      />
      {WrongAlternate ? (
        <span style={{ color: "red" }}>invalid phone number</span>
      ) : (
        <></>
      )}
      <pre></pre>
    </>
  );
};
const PersonalForm = () => {
  //tunisia states
  const Tunisie = [
    "TOZEUR",
    "MANOUBA",
    "BEJA",
    "BEN AROUS",
    "BIZERTE",
    "JENDOUBA",
    "NABEUL",
    "TUNIS",
    "KEF",
    "KASSERINE",
    "GABES",
    "GAFSA",
    "SIDI BOUZID",
    "SFAX",
    "SILIANA",
    "MAHDIA",
    "MONASTIR",
    "KAIROUAN",
    "SOUSSE",
    "ZAGHOUAN",
    "MEDENINE",
    "KEBILI",
    "TATAOUINE",
    "ARIANA",
  ];
  //an array of value of regions select
  const [region, setRegion] = useState([
    "DEGUECHE",
    "TOZEUR",
    "HEZOUA",
    "NEFTA",
    "TAMEGHZA",
  ]);
  //an array of value of zipcode select
  const [CodePostale, setCodePostale] = useState([
    "2214",
    "2224",
    "2260",
    "2261",
    "2263",
    "2261",
    "2262",
  ]);

  //a function that takes the state select value and fill the region select with regions from the entred city
  const regionByState = (state) => {
    //reset region array
    setRegion([]);
    //reset zipcode array
    setCodePostale([]);
    let region = new Set();
    for (const line of liste) {
      let city = line.split(",")[0];
      if (city === state) {
        let rregion = line.split(",")[1];
        region.add(rregion);
      }
    }

    setRegion(Array.from(region));
    zipcodeByRegion(region[0]);
  };
  //a function that takes the region value and fill in the zipcodes of it
  const zipcodeByRegion = (r) => {
    setCodePostale([]);
    let ZipCodeList = new Set();
    for (const element of liste) {
      let region1 = element.split(",")[1];
      if (region1 === r) {
        let zipcode = element.split(",")[3];
        ZipCodeList.add(zipcode);
      }
    }
    setCodePostale(Array.from(ZipCodeList));
  };
  //get selected state
  const [state, setState] = useState("TOZEUR");
  const handleSelectedState = (event) => {
    const state = event;
    //fill in region array by the new state
    regionByState(state);
    //set the new state
    setState(state);
  };
  //get selected region
  const [selectedRegion, setSelectedRegion] = useState("DEGUECHE");
  const handleSelectedRegion = (event) => {
    //fill in zipcode array by the new region
    setSelectedRegion(event);
    //set the new region
    zipcodeByRegion(event);
  };
  //get selected zipcode
  const [selectedZipCode, setSelectedZipCode] = useState("2214");
  const handleSelectedZipCode = (event) => {
    //set the new zipcode
    setSelectedZipCode(event.target.value);
  };
  //

  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="state"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              value={state}
              label="State"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleSelectedState(e.target.value);
              }}
            >
              {Tunisie.map((value, index) => {
                return (
                  <MenuItem defaultValue="" key={index} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <pre> </pre>
      <Controller
        control={control}
        name="region"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              name="region"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              value={selectedRegion}
              label="Region"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleSelectedRegion(e.target.value);
              }}
            >
              {region.map((value, index) => {
                return (
                  <MenuItem defaultValue="" key={index} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <pre> </pre>
      <Controller
        control={control}
        name="zipcode"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Zip Code</InputLabel>
            <Select
              name="zipcode"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              value={selectedZipCode}
              label="Zip Code"
              onChange={handleSelectedZipCode}
              {...field}
            >
              {CodePostale.map((value, index) => {
                return (
                  <MenuItem defaultValue="" key={index} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <pre> </pre>
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            placeholder="Enter Your Card Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardMonth"
        render={({ field }) => (
          <TextField
            id="cardMonth"
            label="Card Month"
            variant="outlined"
            placeholder="Enter Your Card Month"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardYear"
        render={({ field }) => (
          <TextField
            id="cardYear"
            label="Card Year"
            variant="outlined"
            placeholder="Enter Your Card Year"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}
const LinaerStepper = () => {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      Repeatpassword: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      state: "",
      region: "",
      zipcode: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);

    if (activeStep === steps.length - 1) {
      const handleRegister = async () => {
        const firstName = data.firstName;
        const LastName = data.lastName;
        const password = data.password;
        const email = data.emailAddress;
        const phone = data.phoneNumber;
        const state = data.state;
        const region = data.region;
        const zipcode = data.zipcode;

        try {
          const response = await axios.post("/api/auth/farmer", {
            name: firstName,
            LastName: LastName,
            email: email,
            password: password,
            phone: phone,
            state: state,
            zipcode: zipcode,
            region: region,
          });

          // Handle successful registration
          console.log(response.data);
          window.location.href='/'
        } catch (error) {
          // Handle error during registration
          console.error(error);
        }
      };
      handleRegister(data);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography
          //       color="error"
          //       variant="caption"
          //       align="center"
          //       style={{ display: "block" }}
          //     >
          //       there is an error
          //     </Typography>
          //   );
          // }
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
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                style={{ marginRight: "20px", color: "green" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>

              {isStepOptional(activeStep) && (
                <Button
                  style={{ marginRight: "20px", backgroundColor: "green" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                style={{ marginRight: "20px", backgroundColor: "green" }}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
