import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./languages/Data.json";
import USA from "./languages/languages flags/USA.jpg";
import FRNC from "./languages/languages flags/france.jpg";
import SA from "./languages/languages flags/Tunisia.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FarmerLogin from "./login/Farmer-login.js";
import TwoColWithButton from "./components/features/TwoColWithButton";
import TwoColumnWithVideo from "./components/hero/TwoColumnWithVideo";
//header
import AppHeader from "./header/Header.js";
import Footer from "./footer/footer";
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
import TabCardGrid from "./components/cards/CollabCardGrid";
import { SigninFarmer } from "./login/logins/SigninFarmer";
import { useEffect, useState } from "react";
import tw from "twin.macro";
//import Donutchart from "./components/charts/DonutChart";
import LoadingComponent from "./components/Loading/LoadingComponent";
import Profile from "./Farmer/Profile";
import CollaborationPage from "./Collaborations/CollaborationDetails";
import AnimationRevealPage from "./helpers/AnimationRevealPage";
import api from "./login/logins/api";
//import TwoCard from "./components/cards/PortfolioTwoCardsWithImage";
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic `;
const HighlightedText2 = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block font-serif text-[30px] `;

const Subheading = tw.span`tracking-wider text-sm font-medium`;
const Description = tw.span`inline-block mt-8 text-black`;
const imageCss = tw`rounded-4xl max-w-2xl`;

//set the laguage

//languages and their flags

function App() {
  const languages = [
    { value: "English", flag: USA },
    { value: "Français", flag: FRNC },
    { value: "العربية", flag: SA },
  ];
  //language state
  const [language, setLanguage] = useState("English");
  //change language each click
  const hundleLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };
  //content state
  const [content, setContent] = useState({});
  //content language changes each time you change the language
  // useEffect(() => {
  //   if (language === "English") {
  //     setContent(data.English);
  //   } else if (language === "Français") {
  //     setContent(data.Français);
  //   } else if (language === "العربية") {
  //     setContent(data.Arabic);
  //   }
  // }, [language]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Box style={{ marginLeft: "10px" }}>
                  <FormControl style={{ width: "150px" }}>
                    <InputLabel>{content.language}</InputLabel>
                    <Select
                      labelId="id"
                      id="idd"
                      value={language}
                      label={content.language}
                      onChange={hundleLanguage}
                      style={{
                        float: "left",
                      }}
                    >
                      {languages.map((language, index) => {
                        return (
                          <MenuItem key={index} value={language.value}>
                            <div style={{ float: "right" }}>
                              {language.value}{" "}
                            </div>
                            <img
                              alt="language flag"
                              style={{
                                float: "left",
                                width: "30px",
                                height: "20px",
                                borderRadius: "5px",
                              }}
                              src={language.flag}
                            ></img>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box> */}
              </>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/signUp"
            element={<FarmerLogin content={content} />}
          ></Route>
          <Route path="/login" element={<SigninFarmer />}></Route>
          <Route
            path="/"
            element={
              loading ? (
                <LoadingComponent />
              ) : (
                <>
                  <AppHeader />
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
                      subheading={
                        <Subheading>Established Since 2023</Subheading>
                      }
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
                          Join our platform and collaborate with farmers to sell
                          your pistachios and almonds. No more wasted crops or
                          low prices. Together, we can create a sustainable
                          future for farmers and buyers alike.
                          <br />
                          <br />
                          Are you tired of struggling to sell your crops? Our
                          platform connects you with buyers who need your
                          products, ensuring a fair price for your hard work
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
                  <TabCardGrid
                    heading={
                      <>
                        Checkout{" "}
                        <HighlightedText>Collaborations.</HighlightedText>
                      </>
                    }
                  />

                  <pre> </pre>
                  <Footer />
                </>
              )
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <>
                <AppHeader />
                <Profile />
              </>
            }
          ></Route>
          <Route
            path="/collab"
            element={
              <>
                <AppHeader />
                <CollaborationPage />
              </>
            }
          ></Route>
        </Routes>
      </Router>
      <pre> </pre>

      {/* <AnimationRevealPage>

    <Footer/> 
    </AnimationRevealPage>
    <Portfolio />
    <TabCardGrid
        heading={
          <>
            Checkout our <HighlightedText>menu.</HighlightedText>
          </>
        }
      /> */}
    </>
  );
}

export default App;
