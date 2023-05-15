import React, { useState } from "react";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/loginbg-ill.png";
import logo from "../images/logo.png";
import googleIconImageSrc from "../images/google-icon.png";
import twitterIconImageSrc from "../images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import axios from "axios";
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-600 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div` my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs `;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border-0`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-4xl max-h-screen bg-contain bg-center bg-no-repeat`}
`;
const Borderedlink = tw.a`border-b-2 border-t-0 border-r-0 border-l-0 border-gray-500  border-dotted text-primary-500`;

export const Login = ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign In to Bio market",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com",
    },
  ],
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "#",
}) => {
  const [Email, setEmmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleFarmerSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const buyer = await axios.post("/api/auth/loginBuyer", {
        emailOrPhone:Email,
        password:Password,
      });
      localStorage.setItem("token", buyer.data.token);
      console.log(buyer.token)
      
      localStorage.setItem("buyer", JSON.stringify(buyer));

      console.log(buyer.data._id);
      // redirect the user to the protected route
      //window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton key={index} href={socialButton.url}>
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign in with your e-mail</DividerText>
                </DividerTextContainer>
                <pre> </pre>
                <Form>
                  <Input
                    onChange={(e) => setEmmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <SubmitButton onClick={handleFarmerSubmit} type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <Borderedlink href={forgotPasswordUrl}>
                    Forgot Password ?
                  </Borderedlink>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <Borderedlink href={signupUrl}>Sign Up</Borderedlink>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
