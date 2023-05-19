import tw from "twin.macro";
import Donutchart from "../components/charts/DonutChart";
import ThreeCredsSlider from "../components/cards/ThreeColSlider";
import { PrimaryButton } from "../components/misc/Buttons";
import { SectionHeading } from "../components/misc/Headings";
import ReactModalAdapter from "../helpers/ReactModalAdapter";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import ResponsiveVideoEmbed from "../helpers/ResponsiveVideoEmbed";

import AnimationRevealPage from "../helpers/AnimationRevealPage";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import JoinForm from "../components/forms/JoinForm";
import ProgressBarr from "../components/progressCircular/ProgressBar";
const Div = tw.div`flex justify-center mt-4 lg:flex-row flex-col`;
const ButtonContainer = tw.div`flex justify-start mt-12`;
const Heading = tw(SectionHeading)``;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic `;
const DescriptionDiv = tw.div`inline-block mt-8 ml-4 text-black`;
const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const SecondStyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-sm max-h-[100px] absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500 border-none`;
const AcceptButton = tw.button`absolute bottom-0 right-0 bg-primary-500 px-4 py-2 text-white rounded mb-8 mr-8 hocus:bg-white hocus:text-primary-500 border-none`;
const RefuseButton = tw.button`absolute bottom-0 right-[100px]  bg-red-400 hocus:bg-white text-white hocus:text-red-400 px-4 py-2  rounded mb-8 mr-8  border-none`;

const Input = tw.input` px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Check = tw.input`mt-4 h-4 w-4 text-black ml-2`;
const StartPageContainer = tw.div`
  flex flex-col items-start
     p-10 ml-12
`;
const Subheading = tw.span`tracking-wider text-sm font-medium`;
const Borderedlink = tw.a`ml-2 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-500  border-dotted text-primary-500 cursor-pointer`;

const Bg = tw.div`bg-gray-100 w-full px-4 py-4 `;
const CollaborationDetails = () => {
  const { collabId } = useParams();
  const [collab, setCollab] = useState(null);
  const [RequestedQT, setRequestedQT] = useState(0);
  const [availableQT, setavailableQT] = useState(0);
  const [Description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [Quantities, setQuantities] = useState([]);
  const [FarmersNames, setFarmersNames] = useState([]);
  const [Farmers, setFarmers] = useState(new Set());

  const [Quantity, setQuantity] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [SecondmodalIsOpen, setSecondModalIsOpen] = useState(false);

  const [AcceptedTerms, setAcceptedTerms] = useState(true);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const SecondtoggleModal = () => setSecondModalIsOpen(!SecondmodalIsOpen);

  const getCollaboration = async (collabId) => {
    if (collabId) {
      try {
        const response = await axios.get(
          ` http://localhost:8800/api/collab/getcollab/${collabId}`
        );
        setCollab(response.data);
        setRequestedQT(response.data.RequestedQT);
        setavailableQT(response.data.availableQT);
        setDescription(response.data.description);
        const quantities = response.data.participants.map(
          (participant) => participant.quantity
        );
        setQuantities(quantities);
        setType(response.data.ProductType);
        const farmerNames = [];
        const Farmers = []
        for (const participant of response.data.participants) {
          const farmerResponse = await axios.get(
            `http://localhost:8800/api/farmers/${participant.farmer}`
          );
          const farmer = farmerResponse.data;
          Farmers.push(farmer)
          farmerNames.push(farmer.name + "" + farmer.LastName);
        }
        setFarmersNames(farmerNames);
        setFarmers(Farmers)
        return response.data;
      } catch (error) {
        // Handle error
        console.error(error);
        throw error;
      }
    }
  };
  //get the logged in farmerId
  const farmerId = JSON.parse(localStorage.getItem("Farmer"))._id;


  //
const handleJoin=()=>{
  
  setModalIsOpen(true) 
}

  //
  const participateInCollab = async () => {
    
    if (Quantity > RequestedQT - availableQT) {
      console.log("akber")
      toggleModal();
      SecondtoggleModal();
    } else {
      try {
        const response = await axios.post("/api/collab/participate", {
          collabId: collabId,
          farmerId: farmerId,
          quantity: Quantity,
        });

        try {
          const response = await axios.put(
            `/api/collab/updateCollab/${collabId}`,
            { Quantity: Quantity }
          );
          console.log(Quantity);
          toggleModal();
          document.getElementById("prdctqt").value = "";
          return response.data;
        } catch (error) {
          // Handle error
          console.error(error);
          throw error;
        }

        // Handle the response or perform any necessary actions
        console.log("Participation saved:", response.data);
      } catch (error) {
        // Handle errors appropriately
        console.error("Error participating in collaboration:", error);
      }
    }
  };
  const BackToModal = () => {
    const remain = parseFloat(RequestedQT - availableQT) 
    document.getElementById("prdctqt").value =  remain ;
    setQuantity(remain)
    SecondtoggleModal();
  };

  useEffect(() => {
    if (collabId) {
      getCollaboration(collabId);
    }
  }, [collab]);
  return (
    <>
      <AnimationRevealPage>
        <Div>
          <Bg>
            <div>
              <Heading>
                <HighlightedText>{type}</HighlightedText>Collaboration
              </Heading>

              <DescriptionDiv>{Description}</DescriptionDiv>
              <StartPageContainer>
                <Subheading>
                  Enter your available quantity and join the collaboration!
                </Subheading>
                <Input
                  onChange={(e) => setQuantity(e.target.value)}
                  name="productQuantity "
                  id="prdctqt"
                  type="number"
                  placeholder="Quantity"
                  max={RequestedQT - availableQT}
                />
                <div>
                  <Check
                    onClick={() => setAcceptedTerms(!AcceptedTerms)}
                    type="checkbox"
                  />
                  <Borderedlink>accept terms</Borderedlink>
                </div>
                <ButtonContainer>
                  <PrimaryButton
                    disabled={AcceptedTerms}
                    onClick={ handleJoin }
                  >
                    Join Collaboration
                  </PrimaryButton>
                </ButtonContainer>
              </StartPageContainer>
            </div>
          </Bg>
          <Bg>
            <Subheading></Subheading>
            <Donutchart
              Quantities={Quantities}
              Farmers={FarmersNames}
              collab={collab}
            />
          </Bg>
        </Div>
        <Bg>
          <ProgressBarr
            value={((availableQT * 100) / RequestedQT).toString()}
            label="completed"
          />
        </Bg>
      </AnimationRevealPage>
      <AnimationRevealPage>
        <ThreeCredsSlider Farmers={Farmers} FarmersNames={FarmersNames} Quantities={Quantities}/>
      </AnimationRevealPage>
      <StyledModal
        closeTimeoutMS={300}
        className="mainHeroModal"
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <CloseModalButton onClick={toggleModal}>
          <CloseIcon tw="w-6 h-6" />
        </CloseModalButton>
        <div className="content">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
          <AcceptButton onClick={participateInCollab}>accept</AcceptButton>
          <RefuseButton onClick={toggleModal}>refuse</RefuseButton>
        </div>
      </StyledModal>
      {/* styles model if the added quantity is begger that the remaining */}
      <SecondStyledModal
        ariaHideApp={false}
        closeTimeoutMS={300}
        className="mainHeroModal"
        isOpen={SecondmodalIsOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
      >
        <CloseModalButton onClick={SecondtoggleModal}>
          <CloseIcon tw="w-6 h-6" />
        </CloseModalButton>
        <div className="content">
          you are trying to participate with a higher quality than it's remaining! 
          you can participate with {RequestedQT - availableQT+" "} as maximum 
          <AcceptButton onClick={BackToModal}>okey</AcceptButton>
        </div>
      </SecondStyledModal>
    </>
  );
};

export default CollaborationDetails;
