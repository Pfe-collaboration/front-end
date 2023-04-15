import React from "react";
import { InputController } from "./elements/InputController";


export const BasicForm = ({content}) => {
  
  return (
    <>
    
      <InputController name="first-name" placeholder={content.namePlaceholder} labelContent={content.firstName}/>
      <InputController name="last-name" placeholder={content.lastNamePlaceholder} labelContent={content.lastName} />
      <InputController name="email" placeholder={content.emailPlaceholder} labelContent={content.email} />
      <InputController name="pwd" placeholder={content.pwdPlaceholder} labelContent={content.pwd} />
      <InputController name="rpwd" placeholder={content.rpwdPlaceholder} labelContent={content.rpwd} />
      <InputController name="phone" placeholder={content.phoneplaceholder} labelContent={content.phone} />
    </>
  );
};

