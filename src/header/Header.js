import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../helpers/useAnimatedNavToggler.js";

import logo from "../images/logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import api from "../login/logins/api.js";
import { Link } from "react-router-dom";

const Header = tw.header`
  flex justify-between items-center 
  max-w-screen-xl mx-auto
  
`;
const Container = tw.div`sticky top-0 fixed top-0 z-10 w-full bg-white `;
const ImgWrapper = tw.img`ml-16 rounded-full w-[50px] h-[50px]`;
export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = styled.a(({ active }) => [
  tw`
    text-third-300
    no-underline
    text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
    font-semibold tracking-wide transition duration-300
    pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
    cursor-pointer
  `,
  active &&
    css`
      ${tw`text-primary-500`}
    `,
]);

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-20 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300 border-0 bg-white
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

const AppHeader = ({
  Active,
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */
  const [farmerloggedin, setFarmerloggedin] = useState(false);
  const [Buyerloggedin, setBuyerloggedin] = useState(false);

  const farmer = JSON.parse(localStorage.getItem("Farmer"));
  const buyer = JSON.parse(localStorage.getItem("buyer"));

  const Logout = () => {
    if (window.confirm("Do you really want to leave?")) {
      localStorage.removeItem("Farmer");
      window.location.reload();
    }
  };
  const Logoutbuyer = () => {
    if (window.confirm("Do you really want to leave?")) {
      localStorage.removeItem("buyer");
      window.location.reload();
    }
  };
  useEffect(() => {
    if (farmer) {
      setFarmerloggedin(true);
    } else {
      setFarmerloggedin(false);
    }
    if (buyer) {
      setBuyerloggedin(true);
    } else {
      setBuyerloggedin(false);
    }
  }, [farmerloggedin]);
  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink id="home" active={Active === "home"} href="/">
        Home
      </NavLink>
      <NavLink id="collabs" active={Active === "collabs"} href="/collabs">
        Collaborations
      </NavLink>
      <NavLink id="about" active={Active === "about"} href="/#">
        About us{" "}
      </NavLink>
      <NavLink id="contact" active={Active === "contact"} href="/#">
        Contact Us
      </NavLink>
      <NavLink id="notification" active={Active === "notification"} href="/#">
        notifications
      </NavLink>
      {farmerloggedin ? (
        <>
          <NavLink to="/profile">
            <ImgWrapper src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/333035536_881579379771834_8206871795941422881_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JLxG2JbK3igAX_-1pUs&_nc_ht=scontent.ftun16-1.fna&oh=00_AfClyt6yNuBev4RB8bQVeERnsN2u-FAmBXHbDsrS31c94g&oe=648EBB65" />
          </NavLink>
          <NavLink onClick={Logout}>Log Out</NavLink>
        </>
      ) : Buyerloggedin ? (
        <>
          <NavLink to="/profile">
            <ImgWrapper src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/333035536_881579379771834_8206871795941422881_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JLxG2JbK3igAX_-1pUs&_nc_ht=scontent.ftun16-1.fna&oh=00_AfClyt6yNuBev4RB8bQVeERnsN2u-FAmBXHbDsrS31c94g&oe=648EBB65" />
          </NavLink>
          <NavLink onClick={Logoutbuyer}>Log Out</NavLink>
        </>
      ) : (
        <>
          <NavLink href="/login" tw="lg:ml-12!">
            Login
          </NavLink>
          <PrimaryLink
            css={roundedHeaderButton && tw`rounded-full`}
            href="/signUp"
          >
            Sign Up
          </PrimaryLink>
        </>
      )}
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      Bio Market
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Container>
      <Header className={className || "header-light "}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {logoLink}
          {links}
        </DesktopNavLinks>

        <MobileNavLinksContainer
          css={collapseBreakpointCss.mobileNavLinksContainer}
        >
          {logoLink}
          <MobileNavLinks
            initial={{ x: "150%", display: "none" }}
            animate={animation}
            css={collapseBreakpointCss.mobileNavLinks}
          >
            {links}
          </MobileNavLinks>
          <NavToggle
            onClick={toggleNavbar}
            className={showNavLinks ? "open" : "closed"}
          >
            {showNavLinks ? (
              <CloseIcon tw="w-6 h-6 " />
            ) : (
              <MenuIcon tw="w-6 h-6 " />
            )}
          </NavToggle>
        </MobileNavLinksContainer>
      </Header>
    </Container>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
export default AppHeader;
