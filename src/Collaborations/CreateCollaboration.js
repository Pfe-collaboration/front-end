import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import axios from "axios";

const Container = tw(
  ContainerBase
)`min-h-screen  text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-lg m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-32 ml-20`;
const MainContent = tw.div` flex flex-col items-center`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs `;
const InputSelect = tw.select`
w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white 
mt-5 first:mt-0
`;
const InputDes = tw.textarea` w-full px-8 py-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

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

const Borderedlink = tw.a`ml-2 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-500  border-dotted text-primary-500`;
const Option = tw.option`min-h-8`;
const Check = tw.input`mt-4 h-4 w-4 text-black ml-2`;

const CreateCollaboration = () => {
  const [ProductType, setProductType] = useState("");
  const [RequestedQT, setRequestedQT] = useState(0);
  const [Description, setDescription] = useState("");
 
  const createCollab = async (e) => {
    e.preventDefault();
    try {
      const buyer = JSON.parse(localStorage.getItem("buyer"))
      console.log(buyer.buyer)
      if(buyer.buyer && buyer.buyer._id){
        const buyerId=buyer.buyer._id;
        const response = await axios.post("/api/collab", {
          ProductType:ProductType,
          RequestedQT:RequestedQT,
          description:Description,
          buyerId: buyerId,
        });
        
        // Handle the response as needed
        window.location.reload()
        console.log(response.data);
      }
      else {
        const checkbox = document.getElementById("check");
        if (checkbox) {
          checkbox.checked = false;
        }

        window.location.href = "/loginbuyer";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* <AnimationRevealPage> */}
        <Container>
          <Content>
            <MainContainer>
              
              <MainContent>
                <FormContainer>
                  <pre> </pre>
                  <Form >
                    <InputSelect
                      onChange={(e) => setProductType(e.target.value)}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled hidden>
                        Product Type
                      </option>
                      <Option value="pistachio">Pistachio</Option>
                      <Option value="almond">Almond</Option>
                    </InputSelect>
                    <Input
                      onChange={(e) => setRequestedQT(e.target.value)}
                      name="product Quantity "
                      type="number"
                      placeholder="Requested Quantity (en Kg)"
                    />
                    <InputDes
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      type="text"
                      placeholder="Description"
                    />
                    <Check id="check" type="checkbox" />
                    <Borderedlink href="/">
                      accept creating collaboration policy
                    </Borderedlink>
                    <SubmitButton onClick={createCollab} >
                      <span className="text">Create</span>
                    </SubmitButton>
                  </Form>
                </FormContainer>
              </MainContent>
            </MainContainer>
          </Content>
        </Container>
      {/* </AnimationRevealPage>   */}
    </>
  );
};

export default CreateCollaboration;
