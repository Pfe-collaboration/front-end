import tw from "twin.macro";
import Donutchart from "../components/charts/DonutChart";
import ThreeCredsSlider from "../components/cards/ThreeColSlider";
import { PrimaryButton } from "../components/misc/Buttons";
import { SectionHeading } from "../components/misc/Headings";
import AnimationRevealPage from "../helpers/AnimationRevealPage";

const Div = tw.div`flex justify-center mt-4 lg:flex-row flex-col`;
const ButtonContainer = tw.div`flex justify-start ml-2 sm:ml-48 lg:ml-72 mt-12`;
const Heading = tw(SectionHeading)``;

const CollaborationDetails = () => {
  return (
    <>
      <AnimationRevealPage>
        <Div>
          <div>
            <Heading>Collaboration</Heading>
          </div>
          <div>
            <Donutchart />
          </div>
        </Div>
        <ButtonContainer>
          <PrimaryButton>Join Collaboration</PrimaryButton>
        </ButtonContainer>
      </AnimationRevealPage>
      <AnimationRevealPage>
        <ThreeCredsSlider />
      </AnimationRevealPage>
    </>
  );
};

export default CollaborationDetails;
