import React from "react";
import { InputController } from "./elements/InputController";


function RtlClass(isRtl){
  return isRtl ? "rtl" : "ltr";
  
}
function isrtl (content){
  if(content === "English"){
    return false
  }
  if(content === "French"){
    return false
  }
  if(content === "Arabic"){
    return true
  }
}
export const BasicForm = ({content}) => {
 
  const isRtl = isrtl(content.nature)

 
  
  return (
    <>
    
      <InputController dir={RtlClass(isRtl)} name="first-name" placeholder={content.namePlaceholder} labelContent={content.firstName}/>
      <InputController name="last-name" placeholder={content.lastNamePlaceholder} labelContent={content.lastName} />
      <InputController name="email" placeholder={content.emailPlaceholder} labelContent={content.email} />
      <InputController name="pwd" placeholder={content.pwdPlaceholder} labelContent={content.pwd} />
      <InputController name="rpwd" placeholder={content.rpwdPlaceholder} labelContent={content.rpwd} />
      <InputController name="phone" placeholder={content.phoneplaceholder} labelContent={content.phone} />
    </>
  );
};

