import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import TabCardGrid from "../components/cards/CollabCardGrid";
import tw from "twin.macro"
import axios from "axios";
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic `;

const Collabs = () => {
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
  useEffect(() => {
    getAllCollaborations();
    filterCardsByType(AllCollabs);
  }, [AllCollabs]);
  return (
    <>
      <AnimationRevealPage>
        <TabCardGrid
        limit={50}
          almondCollabs={almondCollabs}
          pistachioCollabs={pistachioCollabs}
          AllCollabs={AllCollabs}
          heading={
            <>
               <HighlightedText>Collaborations.</HighlightedText>
            </>
          }
        />
      </AnimationRevealPage>
    </>
  );
};

export default Collabs;
