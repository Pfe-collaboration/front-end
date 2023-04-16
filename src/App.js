import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./languages/Data.json";
// import  Footer  from './footer/footer';
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
// import TabCardGrid from './components/cards/TabCardGrid';
import { FarmerLogin } from "./login/Farmer-login.js";
import { useEffect, useState } from "react";
//import tw from 'twin.macro'
//const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic`;
function App() {
  const languages=["English","Français","العربية"]
  const [language, setLanguage] = useState("English");
  const hundleLanguage = (e) => {
    const selectedLanguage = e.target.value
    setLanguage(selectedLanguage);
  };
  const [content, setContent] = useState({});
  useEffect(() => {
    if (language === "English") {
      setContent(data.English);
      
    } else if (language === "Français") {
      setContent(data.Français);
      

    }
    else if (language === "العربية") {
      setContent(data.Arabic);
      

    }
  },[language]);
  return (
    <>
    <pre>  </pre>
    <Box>
      <FormControl  fullWidth >
        <InputLabel>{content.language}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language }
          label={content.language}
          onChange={hundleLanguage}
          
        >
          {languages.map((value) => {
            return <MenuItem value={value}>{value}</MenuItem>;
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
