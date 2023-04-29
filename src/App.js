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
//header
import AppHeader from "./header/Header.js";
import Footer from "./footer/footer";
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
import TabCardGrid from "./components/cards/TabCardGrid";
import { SigninFarmer } from "./login/logins/SigninFarmer";
import { useEffect, useState } from "react";
import tw from "twin.macro";
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic`;

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
  useEffect(() => {
    if (language === "English") {
      setContent(data.English);
    } else if (language === "Français") {
      setContent(data.Français);
    } else if (language === "العربية") {
      setContent(data.Arabic);
    }
  }, [language]);

  return (
    <>
      <Router>
      <Routes>
          <Route
          path="/"
            element={
              <>
                <AppHeader />
                <Box style={{ marginLeft: "10px" }}>
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
                </Box>
              </>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/signUp"
            element={<FarmerLogin content={content} />}
          ></Route>
          <Route
            path="/login"
            element={<SigninFarmer />}
          ></Route>
          <Route
            path="/"
            element={
              <>
                <TabCardGrid
                  heading={
                    <>
                      Checkout{" "}
                      <HighlightedText>Collaborations.</HighlightedText>
                    </>
                  }
                />
                <Footer />
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
