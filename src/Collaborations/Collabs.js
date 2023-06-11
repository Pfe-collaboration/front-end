import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import TabCardGrid from "../components/cards/CollabCardGrid";
import tw from "twin.macro";
import axios from "axios";
import TwoColWithImg from "../components/testimonials/TwoColumnWithImageAndProfilePictureReview";
import CreateCollaboration from "./CreateCollaboration";
import { SectionHeading } from "../components/misc/Headings";
import BlogPost from "../Blogs/PopularAndRecentBlogPosts";

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic `;
const Heading = tw(SectionHeading)`mr-0 flex text-start`;

const Collabs = () => {
  //check login
  const [farmerloggedin, setFarmerloggedin] = useState(false);
  const [Buyerloggedin, setBuyerloggedin] = useState(false);
  //get local storage variables
  const farmer = JSON.parse(localStorage.getItem("Farmer"));

  const buyer = JSON.parse(localStorage.getItem("buyer"));
  const setLogin = () => {
    if (farmer) {
      setFarmerloggedin(true);
    } else {
      setFarmerloggedin(false);
    }
    if (buyer) {
      setBuyerloggedin(true);
    } else {
      setBuyerloggedin(false);
    }
  };

  const [pistachioCollabs, setPistachioCollabs] = useState([]);
  const [almondCollabs, setAlmondCollabs] = useState([]);
  const [AllCollabs, setAllCollabs] = useState([]);
  const [FarmerCollabs, setFarmerCollabs] = useState([]);
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
  //get logged in buyer collabs
  const [buyerCollabs, setBuyerCollabs] = useState([]);
  const getbuyercollabs = async () => {
    const buyerId = buyer.buyer._id;
    try {
      const response = await fetch(`/api/collab/${buyerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch collaborations");
      }
      const collaborations = await response.json();
      // Process the retrieved collaborations as needed
      setBuyerCollabs(collaborations);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  //filter collaborations by product type
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

  //collabs by farmer
  const getCollabsByFarmerId = (allCollaborations, farmerId) => {
    const collabs = allCollaborations.filter((collab) => {
      return collab.participants.some(
        (participant) => participant.farmer.toString() === farmerId
      );
    });
    setFarmerCollabs(collabs);
  };

  //use Effect
  useEffect(() => {
    setLogin();
    getAllCollaborations();
    filterCardsByType(AllCollabs);
    if (farmer) {
      getCollabsByFarmerId(AllCollabs, farmer._id);
    }
    if (buyer) {
      getbuyercollabs();
    }
  }, [AllCollabs]);
  return (
    <>
      {Buyerloggedin ? (
        <>
          <AnimationRevealPage>
            <Heading>Create a new collaboration</Heading>
            <CreateCollaboration />
            <TwoColWithImg testimonials={buyerCollabs} />
          </AnimationRevealPage>
        </>
      ) : (
        <>
          {FarmerCollabs.length>0 && (
            <AnimationRevealPage>
              <BlogPost FarmerCollabs={FarmerCollabs}></BlogPost>
            </AnimationRevealPage>
          )}
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
      )}
    </>
  );
};

export default Collabs;
