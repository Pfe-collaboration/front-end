import React, { useState } from "react";
import { liste } from "../state, region, zipCode List/TunisiaList";
import { SelectController } from "./elements/SelectController";
import Button from "@mui/material/Button";
//arrow icon
import EastIcon from '@mui/icons-material/East';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const FarmInformationForm = ({ content ,OnChange,activeStep}) => {
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
  const [state, setState] = useState("");
  const handleSelectedState = (newState) => {
    //fill in region array by the new state
    regionByState(newState);
    //set the new state
    setState(newState);
  };
  //get selected region
  const [selectedRegion, setSelectedRegion] = useState("DEGUECHE");
  const handleSelectedRegion = (newRegion) => {
    //fill in zipcode array by the new region
    setSelectedRegion(newRegion);
    //set the new region
    zipcodeByRegion(newRegion);
  };
  //get selected zipcode
  const [selectedZipCode, setSelectedZipCode] = useState("2214");
  const handleSelectedZipCode = (newZipCode) => {
    //set the new zipcode
    setSelectedZipCode(newZipCode);
  };
  const [stp,setStp] = useState(2)
  const handleBack=(event)=>{
    console.log("done")
    const step =event.target.value
    OnChange(step)
    console.log(step)
    setStp(2)
  }
  return (
    <>
      {console.log(state + selectedRegion + selectedZipCode)}
      <SelectController
        labelname={content.state}
        values={Tunisie}
        OnChange={handleSelectedState}
      />
      <pre></pre>
      <SelectController
        labelname={content.region}
        values={region}
        OnChange={handleSelectedRegion}
      />
      <pre></pre>
      <SelectController
        labelname={content.zipcode}
        values={CodePostale}
        OnChange={handleSelectedZipCode}
      />

      <pre> </pre>
      <Button
        style={{ marginRight: "20px" }}
        dir={content.dir}
        disabled={activeStep === 0}
        onClick={handleBack}
      value={1}
      >
        {content.dir === "ltr" ? <ArrowBackIcon /> : <EastIcon />}
        {content.back}
      </Button>
      <Button
        style={{ marginRight: "20px" }}
        dir={content.dir}
        variant="contained"
        color="primary"
        
      >
        {content.Finish}
      </Button>
    </>
  );
};
