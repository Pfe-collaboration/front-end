import loginbg from "../../images/loginbg.png";
import { useState } from "react";
import tw from "twin.macro";
// import { AuthContext } from "../../context/AuthContext";
// import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = tw.section`bg-gray-300 dark:bg-gray-900 `;
const UndeContainer = tw.div`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`;
const FormWrapper = tw.div`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`;
const Wrapper = tw.div`p-6 space-y-4 md:space-y-6 sm:p-8`;
const H1 = tw.div`mb-[60px] text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`;
const Form = tw.form`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`;
const Label = tw.label`block mb-2 text-lg font-medium text-gray-900 dark:text-white`;
const ConserveLabel = tw.label` text-sm text-gray-500 dark:text-gray-300`;
const Input = tw.input` mb-4 h-[42px] mx-2 bg-gray-200 border border-gray-300 text-gray-700 sm:text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
const Check = tw.input`mt-5 w-4 h-4 border border-gray-300 rounded bg-gray-500 focus:ring-2 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500 dark:ring-offset-gray-800`;
const Button = tw.button`h-12 mt-8 mb-8 w-full text-white bg-primary-500 border-0 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-500`;
const SocialButtons = tw.div`flex items-center justify-between`;
const StartItem = tw.div`flex space-x-2`;
const CenterItem = tw.div`flex items-center h-5`;
const Link = tw.a`no-underline flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white`;
const ALink = tw.a`mb-5 text-sm font-medium text-primary-500 underline dark:text-primary-500 hover:text-third-500 cursor-pointer`;
const P = tw.p`text-sm font-light text-gray-500 dark:text-gray-400 `;
const A = tw.a`font-medium text-primary-500 hover:underline dark:text-primary-500 hover:text-third-500 `;
const Image = tw.img`w-20 h-20 mx-6`;
const Span = tw.p`text-center text-red-700 font-normal text-base `;
const Intro = tw.span`text-center mb-2 font-serif text-gray-900 dark:text-white`;
const HighlightedText2 = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block font-serif text-[30px] `;

export const SigninFarmer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFarmerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/loginFarmer", {
        email,
        password,
      });
      const token = res.data.token;
      const farmer = res.data.farmer;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("Farmer", JSON.stringify(farmer));

      console.log(farmer._id);
      // redirect the user to the protected route
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setError("incorrect login or pwd ");
      console.error(error);
    }
  };
  const handleBuyerSubmit = async (e) => {
    e.preventDefault();
    try {
      const buyer = await axios.post("/api/auth/loginBuyer", {
        emailOrPhone: email,
        password: password,
      });

      console.log(buyer.data);
      localStorage.setItem("token", buyer.data.token);
      console.log(buyer.data.token);

      localStorage.setItem("buyer", JSON.stringify(buyer));

      console.log(buyer.data.buyer._id);
      // redirect the user to the protected route
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  //try one function
  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Try logging in as a buyer
      const buyerResponse = await axios.post("/api/auth/loginBuyer", {
        emailOrPhone: email,
        password: password,
      });

      const buyer = buyerResponse.data;
      localStorage.setItem("token", buyer.token);
      localStorage.setItem("buyer", JSON.stringify(buyer));
      console.log(buyer._id);

      // Redirect the user to the protected route
      setLoading(false);
      window.location.href = "/";
    } catch (buyerError) {
      try {
        // If login as a buyer fails, try logging in as a farmer
        const farmerResponse = await axios.post("/api/auth/loginFarmer", {
          email,
          password,
        });

        const farmer = farmerResponse.data.farmer;
        const token = farmerResponse.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("Farmer", JSON.stringify(farmer));

        console.log(farmer._id);

        // Redirect the user to the protected route
        setLoading(false);
        window.location.href = "/";
      } catch (farmerError) {
        // If both login attempts fail, show an error message
        setError("Incorrect login or password");
        console.error(farmerError);
      }
    }
  };

  //

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //two pages display
  const [isFarmer, setIsFarmer] = useState(false);
  const handle = () => {
    setIsFarmer(!isFarmer);
  };
  const intro = [
    "Join the community of farmers to sell your bio pistachio and almond",
    "Discover unique and high-quality products from local farmers",
  ];
  const userType = ["farmer", "buyer"];
  return (
    <Container>
      <UndeContainer>
        <FormWrapper>
          <Wrapper>
            <>
              <H1>
                Sign in as a{" "}
                {isFarmer ? (
                  <HighlightedText2>{userType[0]}</HighlightedText2>
                ) : (
                  <HighlightedText2>{userType[1]}</HighlightedText2>
                )}
              </H1>
              <Link>
                <Image src={loginbg} alt="logo" />
                Bio Market
              </Link>
              <Intro> {isFarmer ? intro[0] : intro[1]}</Intro>
              <Form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <Label htmlFor="email">Your email or phone </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    className=""
                    placeholder="name@company.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <SocialButtons>
                  <StartItem>
                    <CenterItem>
                      <Check
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        required
                      />
                    </CenterItem>

                    <div className="ml-3 text-sm mb-5">
                      <ConserveLabel htmlFor="remember">
                        Remember me
                      </ConserveLabel>
                    </div>
                  </StartItem>
                  <ALink href="#">Forgot password?</ALink>
                </SocialButtons>

                <Button
                  disabled={loading}
                  type="submit"
                  onClick={ handleLoginSubmit}
                >
                  Sign in
                </Button>
                {error && <Span>{error}</Span>}
                <ALink onClick={handle}>
                  sign in as a {isFarmer ? userType[1] : userType[0]}
                </ALink>
                <P className="">
                  Don’t have an account yet? <A href="/signUp"> Sign up</A>
                </P>
              </Form>
            </>
          </Wrapper>
        </FormWrapper>
      </UndeContainer>
    </Container>
  );
};
