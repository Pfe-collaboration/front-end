import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "../components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start `;
const Post = tw(
  motion.a
)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)((props) => [
  `background-image: url("${props.$imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`,
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500 text-gray-600`;
const Description = tw.p`mt-2 font-medium text-black leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg text-third-500`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``;

const BlogPost = (FarmerCollabs) => {
  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%",
    },
    hover: {
      backgroundSize: "110%",
    },
  };

  //get first two collabs

  //
  const collabs = Array(FarmerCollabs.FarmerCollabs) 
 const lastCollabs = collabs[0].slice(0, 2);

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>Last Collabs</Heading>
            <PostsContainer>
              {lastCollabs.map((collab, index) => (
                <Post
                  key={index}
                  href={`/collab/${collab._id}`}
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Image
                    transition={{ duration: 0.3 }}
                    variants={postBackgroundSizeAnimation}
                    $imageSrc={"https://post.healthline.com/wp-content/uploads/2022/05/pistachios-overhead-view-732-549-feature-thumb.jpg"}
                  />
                  <Title><b> Owner :</b> {collab.buyer.fullName}</Title>
                  <AuthorName> Available {collab.availableQT}kg  ( {collab.RequestedQT} kg Required) </AuthorName>
                  <Description>{collab.description}</Description>
                  <AuthorInfo>
                    <AuthorImage src={"https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"} />
                    <AuthorNameAndProfession>
                      <AuthorName tw="text-primary-400">{collab.buyer.fullName}</AuthorName>
                      <AuthorProfile>{collab.ProductType}</AuthorProfile>
                    </AuthorNameAndProfession>
                  </AuthorInfo>
                </Post>
              ))}
            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Recent Collabs</Heading>
            <PostsContainer >
              {collabs[0].map((collab, index) => (
                <Post tw="bg-gray-100 min-w-[400px]"  key={index} href={`/collab/${collab._id}`} className="group">
                  <PostTextContainer>
                    <Title><b> Owner :</b> {collab.buyer.fullName}</Title>
                    <AuthorName>{collab.ProductType}</AuthorName>
                  </PostTextContainer>
                  <Image $imageSrc={"https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"} />
                </Post>
              ))}
            </PostsContainer>
            
          </RecentPostsContainer>
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
};
export default BlogPost;
