import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "../misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full  p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800 `;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
const ThreeCredsSlider= () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc: "https://www.shutterstock.com/image-photo/attractive-man-sexy-work-suit-260nw-1689029407.jpg",
      name: "Belgacem",
      bio: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Gafsa, Tunisia",
      participate: "USD 39/Day",
      rating: "4.8",
    },
    {
      imageSrc: "https://c8.alamy.com/comp/TR5WDE/pistachio-nut-pistacia-vera-kurdian-farmer-trimming-pistachio-tree-turkey-anatolia-ayran-kasabasi-TR5WDE.jpg",
      name: "Mahmoud",
      bio: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Gafsa, Tunisia",
      participate: "USD 50/Day",
      rating: 4.9,
    },
    {
      imageSrc: "https://i.ytimg.com/vi/E-NGGI_RiV0/maxresdefault.jpg",
      name: "Masoud",
      bio: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Sidi Bouzid, Tunisia",
      participate: "USD 19/Day",
      rating: "5.0",
    },
    {
      imageSrc: "https://c8.alamy.com/comp/2HX2M6F/caucasian-positive-looking-male-farmer-in-overalls-and-cap-inspect-corn-stalks-at-field-2HX2M6F.jpg",
      name: "Fadhel",
      bio: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Kasserine, Tunisia",
      participate: "USD 99/Day",
      rating: 4.5,
    },
  ]

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Participated Farmers</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.name}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{card.rating}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{card.participate}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.bio}</Description>
              </TextInfo>
              <PrimaryButton>send a message</PrimaryButton>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
export default ThreeCredsSlider;