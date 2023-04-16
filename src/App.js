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
import SA from "./languages/languages flags/saudiaAribiya.jpg";

// import  Footer  from './footer/footer';
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
// import TabCardGrid from './components/cards/TabCardGrid';
import { FarmerLogin } from "./login/Farmer-login.js";
import { useEffect, useState } from "react";
//import tw from 'twin.macro'
//const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic`;
function App() {
  //languages and their flags
  const languages = [{ value: "English", flag: USA }, {value:"Français",flag:FRNC}, {value:"العربية", flag:SA}];
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
      <pre> </pre>
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
            {languages.map((language) => {
              return (
                <MenuItem value={language.value}>
                  <div style={{ float: "right" }}>{language.value} </div>
                  <img
                  alt="language flag"
                    right
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
      <FarmerLogin content={content} />
    </>
  );
}

export default App;
