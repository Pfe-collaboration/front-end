import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import  Footer  from './footer/footer';
// import Portfolio from './components/cards/PortfolioTwoCardsWithImage'
// import AnimationRevealPage from './helpers/AnimationRevealPage';
// import TabCardGrid from './components/cards/TabCardGrid';
import {FarmerLogin} from "./login/Farmer-login.js"
//import tw from 'twin.macro'
//const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block italic`;
function App() {
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
  <FarmerLogin/>
    </>
  );
}

export default App;
