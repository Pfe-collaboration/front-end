import React, { useEffect, useState } from "react";
import AppHeader from "./header/Header";
import AnimationRevealPage from "./helpers/AnimationRevealPage";
import TwoColumnWithVideo from "./components/hero/TwoColumnWithVideo";
import TwoColWithButton from "./components/features/TwoColWithButton";
import TabCardGrid from "./components/cards/CollabCardGrid";
import Footer from "./footer/footer";
import tw from "twin.macro";
import axios from "axios";
import { PrimaryButton as PrimaryButtonBase } from "./components/misc/Buttons";
import { Link } from "react-router-dom";

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic `;
const Subheading = tw.span`tracking-wider text-sm font-medium`;
const HighlightedText2 = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block font-serif text-[30px] `;
const Description = tw.span`inline-block mt-8 text-black`;
const imageCss = tw`rounded-4xl max-w-2xl`;
const CardButton = tw(PrimaryButtonBase)`text-sm border-0 ml-56`;

const Main = () => {
  //
  const [pistachioCollabs, setPistachioCollabs] = useState([]);
  const [almondCollabs, setAlmondCollabs] = useState([]);
  const [AllCollabs, setAllCollabs] = useState([]);
  //get collaborations from db
  const getAllCollaborations = async () => {
    try {
      const response = await axios.get("/api/collab");
      const collaborations = response.data;
      const collabs = Array.from(collaborations);
      setAllCollabs(collabs);
      // console.log(collabs[7].participants)
      return collabs;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const filterCardsByType = (cards) => {
    if (cards.filter((card) => card.ProductType === "pistachio")) {
      const filtredCards = cards.filter(
        (card) => card.ProductType === "pistachio"
      );

      setPistachioCollabs(filtredCards);
    }
    if (cards.filter((card) => card.ProductType === "almond")) {
      const filtredCards = cards.filter(
        (card) => card.ProductType === "almond"
      );
      setAlmondCollabs(filtredCards);
    }
  };
  const buyer = JSON.parse(localStorage.getItem("buyer"))
  useEffect(() => {
    getAllCollaborations();
    filterCardsByType(AllCollabs);
  }, [AllCollabs]);
  return (
    <div>
      <AppHeader Active="home"  />
      <AnimationRevealPage>
        <TwoColumnWithVideo
          heading={
            <>
              Bio Pistachio & Almond{" "}
              <HighlightedText>Just Near You.</HighlightedText>
            </>
          }
          description="We aim to connect farmers who grow organic and bio-certified pistachio and almond crops with potential buyers who are interested in purchasing high-quality, sustainably-grown products."
          imageSrc="https://www.agrifarming.in/wp-content/uploads/2022/04/Boost-Almond-Yield2-1024x683.jpg"
          imageCss={imageCss}
          imageDecoratorBlob={true}
          primaryButtonText="see more"
          watchVideoButtonText="demo video"
        />
      </AnimationRevealPage>
      <AnimationRevealPage>
        <TwoColWithButton
          imageRounded
          subheading={<Subheading>Established Since 2023</Subheading>}
          heading={
            <>
              Join us
              <wbr />{" "}
              <HighlightedText2>
                for an efficient collaboration.
              </HighlightedText2>
            </>
          }
          imageDecoratorBlob={true}
          description={
            <Description>
              Join our platform and collaborate with farmers to sell your
              pistachios and almonds. No more wasted crops or low prices.
              Together, we can create a sustainable future for farmers and
              buyers alike.
              <br />
              <br />
              Are you tired of struggling to sell your crops? Our platform
              connects you with buyers who need your products, ensuring a fair
              price for your hard work
            </Description>
          }
          buttonRounded={false}
          textOnLeft={false}
          primaryButtonText="read more"
          imageSrc={
            "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Pistachio_Pack_7_FGT.jpg?v=1629473544&width=1000"
          }
          imageCss={imageCss}
          imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
          primaryButtonUrl="/profile"
        />
      </AnimationRevealPage>
      {!buyer&&
      <AnimationRevealPage>
        <TabCardGrid
        limit={3}
          almondCollabs={almondCollabs}
          pistachioCollabs={pistachioCollabs}
          AllCollabs={AllCollabs}
          heading={
            <>
              Checkout <HighlightedText>Collaborations.</HighlightedText>
            </>
          }
        />
        <Link to="/collabs"><CardButton> see more</CardButton></Link>
      </AnimationRevealPage>
    }
      <pre> </pre>
      <Footer />
    </div>
  );
};

export default Main;
