import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";
import { SectionHeading } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-7.svg";
import { Link } from "react-router-dom";
import ReviewsBar from "../progressCircular/ReviewsBar.js";
import axios from "axios";
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row mb-4`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 pr-0 xl:mt-0 `;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-0 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-0 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:pr-10 md:pr-6 lg:pr-12 `;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 no-underline`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t max-h-[200px]`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end text-black`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm border-0 ml-2`;

const CardText = tw.div`pl-4 text-gray-900 pt-8`;
const CardTitle = tw.h5`text-lg font-bold  group-hover:text-primary-500 `;
const CardContent = tw.p`mt-0 text-sm font-medium text-gray-600`;
// const ButtonContainer = tw.div`flex `
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;
const Div = tw.div`flex items-center space-x-4`;
const P = tw.div`text-left items-center self-start mr-4 text-third-200`;
const Available = tw.div`text-primary-300`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic ml-4`;

const TabCardGrid = ({ heading = "Checkout our collaborations" }) => {
  const [pistachioCollabs, setPistachioCollabs] = useState([]);
  const [almondCollabs, setAlmondCollabs] = useState([]);
  const [LimitedPistachioCollabs, setLimitedPistachioCollabs] = useState([]);
  const [LimitedAlmondCollabs, setLimitedAlmondCollabs] = useState([]);
  const [AllCollabs, setAllCollabs] = useState([]);
  const tabs = {
    All: AllCollabs,
    Pistachio: pistachioCollabs,
    Almond: almondCollabs,
  };
  
  const getAllCollaborations = async () => {
    try {
      const response = await axios.get("/api/collab");
      const collaborations = response.data;
      const collabs = Array.from(collaborations);
      
      setAllCollabs(collabs);
      return collabs;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const filterCardsByType = (cards) => {
    if (cards.filter((card) => card.ProductType === "pistachio")) {
      const filtredCards = cards.filter((card) => card.ProductType === "pistachio");
      const limitedFiltredCards = filtredCards.slice(0, 6);

      setPistachioCollabs(filtredCards);
      setLimitedPistachioCollabs(limitedFiltredCards);
    }
    if (cards.filter((card) => card.ProductType === "almond")) {
      const filtredCards = cards.filter((card) => card.ProductType === "almond");
      const limitedFiltredCards = filtredCards.slice(0, 6);
      setLimitedAlmondCollabs(limitedFiltredCards);
      setAlmondCollabs(filtredCards);
    }
  };
  useEffect(() => {
    getAllCollaborations();
    filterCardsByType(tabs.All);
    
  }, [AllCollabs,tabs.All]);
  //set a 6 limit array to display it
  const limitedTabs = tabs.All.slice(0, 6);
  const limited = {
    All: [limitedTabs],
    Pistachio: LimitedPistachioCollabs,
    Almond: LimitedAlmondCollabs,
  };
  // Render each tab item here
  // Use item.imageSrc, item.title, item.content, etc.

  // renderedTabs will contain only the first 6 tab items from tabs.All array

  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);
  const ControlTab = (tabName) => {
    setActiveTab(tabName);
    
    
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <br />
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => ControlTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              
              <CardContainer key={index}>
                
                <Card
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <CardImageContainer imageSrc={card.ProductType==="pistachio"?"https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg":"https://www.foodandwine.com/thmb/fZ1mdpfjIcerIuFyodBCBQTSMbo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CA-Almond-Surplus-FT-BLOG0722-2000-081a61cde398431aba1b4614a168a7c8.jpg"}>
                    <CardRatingContainer>
                      <CardRating>
                        {/* <StarIcon /> */}
                        {card.ProductType}
                      </CardRating>
                      {/* <CardReview>({card.reviews})</CardReview> */}
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto",
                        },
                        rest: {
                          opacity: 0,
                          height: 0,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to="/profile">
                        <CardButton>join</CardButton>
                      </Link>
                      <Link to="/collab">
                        <CardButton>details</CardButton>
                      </Link>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>Owner : owner </CardTitle>
                    {/* <CardContent>{card.content}</CardContent> */}
                    <CardContent>
                      Requested Quantity:{" "}
                      <HighlightedText> {card.RequestedQT} Kg </HighlightedText>
                    </CardContent>
                    <Div>
                      <P>
                        Available Quantity: <br></br>{" "}
                        <Available>
                          {card.availableQT }
                          Kg
                        </Available>
                      </P>
                      <ReviewsBar score={(card.availableQT*100/card.RequestedQT).toFixed(0)} />
                    </Div>
                  </CardText>
                </Card>
                <pre> </pre>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

export default TabCardGrid;
