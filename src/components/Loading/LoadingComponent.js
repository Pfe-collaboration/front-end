import React from "react";
import loadingImg from "../../images/loading/pistachio&almondLoading.png";
import tw from "twin.macro";
const Center = tw.div`flex items-center justify-center h-screen`;
const Containerr =tw.div`flex items-center justify-center`
const ImageContainer = tw.img`w-[1000px] h-[600px] animate-pulse`;

const LoadingComponent = () => {
  return (
    <>
      <Center >
        <Containerr >
          <ImageContainer src={loadingImg} alt="almond"  />
          
        </Containerr>
      </Center>
    </>
  );
};

export default LoadingComponent;
