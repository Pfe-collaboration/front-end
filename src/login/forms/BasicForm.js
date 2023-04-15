import React from "react";
import { InputController } from "./elements/InputController";


export const BasicForm = () => {
  
  return (
    <>
      <InputController name="first-name" placeholder="enter your first name" labelContent="first name"/>
      <InputController name="last-name" placeholder="enter your last name" labelContent="Last name" />
      <InputController name="email" placeholder="enter your Email" labelContent="Email" />
      <InputController name="pwd" placeholder="enter your password" labelContent="Password" />
      <InputController name="rpwd" placeholder="repeat your password" labelContent="Repeat Password" />
      <InputController name="phone" placeholder="enter your phone number" labelContent="Phone Number " />
    </>
  );
};

