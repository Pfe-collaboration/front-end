import tw from "twin.macro";
import styled from "styled-components";

const CenteredFormContainer = tw.div`
  flex items-center justify-center
  w-full  bg-gray-100
`;
const FormContainer = tw.div`w-[600px] flex-1  mt-8 pb-8 bg-white `;
const Form = tw.form`mx-auto max-w-xs `;
const InputSelect = tw.select`
w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white 
mt-5 first:mt-0
`;
const Option = tw.option`min-h-8`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const InputDes = tw.textarea` w-full px-8 py-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Check = tw.input`mt-4 h-4 w-4 text-black ml-2`;
const Borderedlink = tw.a`ml-2 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-500  border-dotted text-primary-500`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border-0`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const JoinForm = () => {
  return (
    <CenteredFormContainer>
      <FormContainer>
        <pre> </pre>
        <Form>
          <InputSelect
            //onChange={(e) => setProductType(e.target.value)}
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
            // onChange={(e) => setRequestedQT(e.target.value)}
            name="product Quantity "
            type="number"
            placeholder="Requested Quantity (en Kg)"
          />
          <InputDes
            //onChange={(e) => setDescription(e.target.value)}
            name="description"
            type="text"
            placeholder="Description"
          />
          <Check type="checkbox" />
          <Borderedlink href="/">accept policy</Borderedlink>
          <SubmitButton>
            <span className="text">Create</span>
          </SubmitButton>
        </Form>
      </FormContainer>
    </CenteredFormContainer>
  );
};

export default JoinForm;
