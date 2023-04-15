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
  const [language, setLanguage] = useState("English");
  const hundleLanguage = (e) => {
    const selectedLaguage = e.target.value;
    setLanguage(selectedLaguage);
  };
  const [content, setContent] = useState({});
  useEffect(() => {
    if (language === "English") {
      setContent(data.English);
      
    } else if (language === "Français") {
      setContent(data.Français);
      

    }
    else if (language === "Arabic") {
      setContent(data.Arabic);
      

    }
  },[language]);
  return (
    <>
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
      <div>
        <select onChange={hundleLanguage}>
          <option value="English" selected>
            English
          </option>
          <option value="Français">Français</option>
          <option value="Arabic">العربية</option>
        </select>
      </div>
      <FarmerLogin content={content} />
    </>
  );
}

export default App;
