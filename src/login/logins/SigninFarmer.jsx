import loginbg from "../../images/loginbg.png";
import { useContext, useState } from "react";
import tw from "twin.macro";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
const Check = tw.input`mt-5 w-4 h-4 border border-gray-300 rounded bg-gray-500 focus:ring-2 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800`;
const Button = tw.button`h-12 mt-8 mb-8 w-full text-white bg-primary-300 border-0 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500`;
const SocialButtons = tw.div`flex items-center justify-between`;
const StartItem = tw.div`flex space-x-2`;
const CenterItem = tw.div`flex items-center h-5`;
const Link = tw.a`no-underline flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white`;
const ALink = tw.a`mb-5 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-third-500`;
const P = tw.p`text-sm font-light text-gray-500 dark:text-gray-400 `;
const A = tw.a`font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-third-500 `;
const Image = tw.img`w-20 h-20 mx-6`;
const Span = tw.p`text-center text-red-700 font-normal text-base `;
export const SigninFarmer = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <Container>
      <UndeContainer>
        <FormWrapper>
          <Wrapper>
            <H1>Sign in to your farmer account</H1>
            <Link>
              <Image src={loginbg} alt="logo" />
              Bio Market
            </Link>
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
                  onChange={handleChange}
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
              <Button disabled={loading} type="submit" onClick={handleLogin}>
                Sign in
              </Button>
              {error && <Span>{error.message}</Span>}
              <P className="">
                Don’t have an account yet? <A href="/signUp"> Sign up</A>
              </P>
            </Form>
          </Wrapper>
        </FormWrapper>
      </UndeContainer>
    </Container>
  );
};
