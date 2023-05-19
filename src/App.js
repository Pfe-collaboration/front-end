
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import USA from "./languages/languages flags/USA.jpg";
import FRNC from "./languages/languages flags/france.jpg";
import SA from "./languages/languages flags/Tunisia.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FarmerLogin from "./login/Farmer-login.js";
//header
import AppHeader from "./header/Header.js";
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
import { SigninFarmer } from "./login/logins/SigninFarmer";
import { useEffect, useState } from "react";
//import Donutchart from "./components/charts/DonutChart";
import LoadingComponent from "./components/Loading/LoadingComponent";
import Profile from "./Farmer/Profile";
import data from "./languages/Data.json"
import Chat from "./Chat/Chat";
import { Login } from "./pages/Login";
import CreateCollaboration from "./Collaborations/CreateCollaboration";
import CollaborationDetails from "./Collaborations/CollaborationDetails";
import Main from "./Main";
import Collabs from "./Collaborations/Collabs";
import PopUp from "./helpers/PopUp";
import Footer from "./footer/footer";
//import TwoCard from "./components/cards/PortfolioTwoCardsWithImage";

//

//languages and their flags

function App() {
  //

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
                  <Main />
                </>
              )
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                <AppHeader Active="profile" />
                <Profile />
              </>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <>
                <AppHeader />
                <Chat />
              </>
            }
          ></Route>
          <Route
            path="/loginbuyer"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/createCollab"
            element={
              <>
                <CreateCollaboration />
              </>
            }
          ></Route>
          <Route
            path="collabs"
            element={
              <>
                <AppHeader Active="collabs"/>
                <Collabs />
                <Footer></Footer>
              </>
            }
          ></Route>
          <Route
            path="collab/:collabId"
            element={
              <>
                <AppHeader Active="collabs" />
                
                <CollaborationDetails />
              </>
            }
          ></Route>
         
        </Routes>
      </Router>
      <pre> </pre>
    </>
  );
}

export default App;
