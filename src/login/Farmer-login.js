import { CssBaseline, Container, Paper, Box } from "@mui/material";
import logo from "../images/logo.png";
import tw from "twin.macro";
import Stepper from "./logins/Stepper.js";
const Link = tw.a`ml-4 text-primary-300 no-underline flex items-center  text-2xl font-semibold text-gray-900 dark:text-white`;
const Center = tw.div`grid items-center justify-center `;
const P = tw.p`text-sm font-light text-gray-500 dark:text-gray-400 text-end`;
const A = tw.a`font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-third-500 `;
const Bg=tw.div`bg-gray-100`
const FarmerLogin = ({ content }) => {
  return (
    <Bg >
      <CssBaseline />
      <Container component={Box} p={4}>
        <Center>
          <img src={logo} alt="logo" />
          <Link>Bio Market</Link>
        </Center>
        <br />

        <Paper component={Box} p={4}>
          <Stepper  />
        </Paper>
        <pre></pre>
        <P>
          already have an account ? <A href="/login"> Sign in</A>
        </P>
      </Container>
    </Bg>
  );
};

export default FarmerLogin;
