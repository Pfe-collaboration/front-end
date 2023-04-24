import React, { useState } from "react";
import { InputController } from "./elements/InputController";

export const BasicForm = ({ content, onClick, props }) => {
  
//send inputs back 


  //name verification boolean
  const [validName, setValidName] = useState(false);
  //function that verifies name
  function NameVerify(name) {
    if (!/^[a-zA-Z ]+$/.test(name)) {
      setValidName(false);
      console.log("wrong name");
    } else {
      setValidName(true);
      inputs.name=name;
      console.log(inputs.name);
    }
  }
  //last name verification boolean
  const [validLastName, setValidLastName] = useState(false);
  //function that verifies name
  function LastNameVerify(Lastname) {
    if (!/^[a-zA-Z ]+$/.test(Lastname)) {
      setValidLastName(false);
      console.log("wrong last name");
    } else {
      setValidLastName(true);
      inputs.lastName=Lastname;
      console.log(Lastname);
    }
  }

  //email verification boolean
  const [ValidEmail, setValidEmail] = useState(false);
  //function that verifies name
  function EmailVerify(email) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setValidEmail(false);
      console.log("email false");
    } else {
      setValidEmail(true);
      inputs.email=email;
      console.log("email true");
    }
  }

  //verify password strenght
  const [strength, setStrength] = useState(false);
  function checkPasswordStrength(password) {
    let strength = '';
    if (password.length < 8) {
      strength = 'weak';
      setStrength(false)
    } else if (password.length >= 8 && password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) {
      strength = 'strong';
     inputs.password=password;
      console.log(password)
      setStrength(true)
    } else {
      strength = 'medium';
      inputs.password=password;
      console.log(password);
      setStrength(true)
    }
    return strength;
  }

//handle repeat pwd
function rpwd(rpwd) {
  if(rpwd===inputs.password){
    
    return true
  }
  else{
    return false
  }

}

//handlephone number 
const [validPhone,setValidPhone] = useState(false)
function isValidTunisianPhoneNumber(phoneNumber) {
  // Regular expression for Tunisian phone number
  const phoneRegex = /^(\+216)?(2|4|5|9)\d{7}$/;

  if( phoneRegex.test(phoneNumber)){
    inputs.phone=phoneNumber
    setValidPhone(true)
  }
  else{

  }
}

//inputs
const [inputs,setInputs]=useState([{
  name:"",
  lastName:"",
  email:"",
  phone:"",
  password:""
}])
// get the inputs error
  
function validInputs(){
    if(validName===false){
      console.log("invalid name")
      return {
        state : false,
        msg : "invalid name"
      }
    }
    else if(validLastName===false){
      return {
        state : false,
        msg : "invalid last name"
      }
    }
    else if(ValidEmail===false){
      return {
        state : false,
        msg : "invalid email"
      }
    }
    else if(validPhone===false){
      return {
        state : false,
        msg : "invalid phone number"
      }
    }
    else{
      onClick(inputs)
      
      console.log(inputs.name+" "+inputs.lastName+" "+inputs.email+" "+inputs.phone  + ""+ strength)
    }
} 

// 

  return (
    <>
      <InputController
        OnChange={NameVerify}
        name="first-name"
        placeholder={content.namePlaceholder}
        labelContent={content.firstName}
        //set it to true if it's not a password
        InputType={true}
        
      />
      <InputController
        OnChange={LastNameVerify}
        name="last-name"
        placeholder={content.lastNamePlaceholder}
        labelContent={content.lastName}
        //set it to true if it's not a password
        InputType={true}
      />
      <InputController
        OnChange={EmailVerify}
        name="email"
        placeholder={content.emailPlaceholder}
        labelContent={content.email}
        //set it to true if it's not a password
        InputType={true}
      />

      <InputController
        OnChange={checkPasswordStrength}
        name="pwd"
        placeholder={content.pwdPlaceholder}
        labelContent={content.pwd}
        //set it to false if it's a password
        InputType={false}
      />
      <InputController
        OnChange={rpwd}
        name="rpwd"
        placeholder={content.rpwdPlaceholder}
        labelContent={content.rpwd}
        //set it to false if it's a password
        InputType={false}
      />
      <InputController
        OnChange={isValidTunisianPhoneNumber}
        name="phone"
        placeholder={content.phoneplaceholder}
        labelContent={content.phone}
        //set it to true if it's not a password
        InputType={true}
      />
      <button onClick={validInputs}></button>
    </>
  );
};
