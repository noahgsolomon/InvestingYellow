import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants.ts";
import { toggleTheme } from "../../util/toggleTheme.ts";
import { Button } from "./button.tsx";
// import amogus from 'assets/amogus.png';
import whiteamogus from "assets/whiteamogus.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Typed from "typed.js";
import VideoCard from "./VideoCard.tsx";
import Balancer from "react-wrap-balancer";
import { CircleDollarSign, Sparkles } from "lucide-react";
import { useSpring, animated } from "react-spring";
import { NAME } from "../../../config.ts";
import { Link } from "react-router-dom";

// const goldSilverTheme = {
//   primary: "#FFD700", // Gold
//   secondary: "#C0C0C0", // Silver
//   headerGradient: "from-[#E0E0E0] to-transparent", // Passive Silver to Transparent
//   buttonGradient: "from-[#C0C0C0] to-[#E0E0E0] dark:to-[#FFD700]",
//   ring: "ring-[#FFD700]",
//   buttonFill: "fill-[#FFD700]",
//   color1: "#FFFAF0", // Lightest Gold (Cream)
//   color2: "#FFF0E1", // Lighter Gold
//   color3: "#FFD700", // Gold
//   color4: "#B8860B", // Darker Gold (DarkGoldenRod)
//   color5: "#CD853F", // Dark Gold (Peru)
//   color6: "#8B4513", // Darkest Gold (SaddleBrown)
//   text: "text-[#FFD700]", // Gold Text
// };

const greenTheme = {
  primary: "#FFD700",
  secondary: "#C8A200",
  headerGradient: "from-yellow-100/40 to-transparent",
    buttonGradient: "from-gray-800 to-black dark:from-white dark:to-gray-300",
  button2Gradient: "from-gray-400 to-gray-600 dark:to-gray-300",
  ring: "ring-yellow-500",
  buttonFill: "fill-blue-400",
  color1: "#FFC400", // Lighter Gold
  color2: "#FFAA00", // Medium Light Gold
  color3: "#FF8F00", // Medium Dark Gold
  color4: "#FF7100", // Darker Gold
  color5: "#00BFFF", // Deep Sky Blue
  color6: "#4169E1", // Sienna
  text: "text-yellow-600",
};

const border = "rounded-lg border-2 border-gray-200 dark:border-opacity-[5%]"

const Home: FC = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Your AI-Powered Savings Strategist.",
        "From Detailed Reports to Tailored Savings Plans. All Automated.",
        "Analyze, Strategize, Save. It's That Seamless.",
        "Intelligent, Insightful, and Secure.",
        "Harness AI to Maximize Your Savings Potential.",
        "Elevate Your Financial Future.",
    ],    
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: false,
      loopCount: 1,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const [activeTheme, ] = useState(greenTheme);

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem(LOCALSTORAGE_THEME_KEY)
  );

  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const [currentImage, setCurrentImage] = useState('https://images.codefoli.com/hero.png');
  useEffect(() => {
    if (currentTheme === DARK_THEME_KEY) {
      setCurrentImage('https://images.codefoli.com/herodark.png');
    } else {
      setCurrentImage('https://images.codefoli.com/hero.png');
    }
  }, [currentTheme]);

  useEffect(() => {
    document.body.style.setProperty("--primary", activeTheme.primary);
    document.body.style.setProperty("--color-1", activeTheme.color1);
    document.body.style.setProperty("--color-2", activeTheme.color2);
    document.body.style.setProperty("--color-3", activeTheme.color3);
    document.body.style.setProperty("--color-4", activeTheme.color4);
    document.body.style.setProperty("--color-5", activeTheme.color5);
    document.body.style.setProperty("--color-6", activeTheme.color6);
  }, [activeTheme]);

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
      (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
        | typeof LIGHT_THEME_KEY
        | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  useEffect(() => {
    const themeChangeListener = () => {
      setCurrentTheme(localStorage.getItem("theme"));
    };

    window.addEventListener("themeChanged", themeChangeListener);

    return () => {
      window.removeEventListener("themeChanged", themeChangeListener);
    };
  }, []);

  // const themes = [
  //   greenTheme,
  //   goldSilverTheme
  // ];
  // const [, setCurrentThemeIndex] = useState(0);
  // const togglePageTheme = () => {
  //   setCurrentThemeIndex((prev) => {
  //     const newIndex = (prev + 1) % themes.length;
  //     return newIndex;
  //   });
  // };

  const fall = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration:250 },
    delay: 100,
  });

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <>
      <div className="h-screen">
        <div
          className={`bg-gradient-to-b ${activeTheme.headerGradient} to-transparent transition-all dark:from-gray-900`}
        >
          <header>
            <div
              className={
                "mx-5 flex flex-row items-center justify-between pt-10 md:mx-20"
              }
            >
              <div
                className={"flex cursor-pointer flex-row items-center gap-4"}
              >
                <div className="text-5xl opacity-80 transition-all hover:opacity-60 w-[60px] h-[60px] lg:h-16 lg:w-16"><CircleDollarSign className="w-12 h-12 hover:opacity-80 transition-all"/></div>
              </div>
              <div className="flex flex-row gap-4">
                {theme === LIGHT_THEME_KEY ? (
                  <svg
                    onClick={handleToggleTheme}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                ) : (
                  <svg
                    onClick={handleToggleTheme}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                )}
                {/* <div onClick={togglePageTheme} className={"cursor-pointer"}>
                  <Shuffle className="h-5 w-5 transition-all hover:opacity-80" />
                </div> */}
              </div>
              {/* <div className="flex flex-col items-center justify-center ">
                    <div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">
                      <Link
                          className="mx-auto rounded-full bg-gradient-to-r from-gray-400 to-gray-600 p-[1px] brightness-90 contrast-150 focus:outline-none focus-visible:ring-2 dark:brightness-125 dark:contrast-100 dark:text-gray-200 sm:block"
                          to={'/login'}
                      >
                        <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80 dark:text-gray-300">
                          <span className="bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent block sm:inline dark:text-gray-300">
                            <svg
                                className="mr-1 inline-block h-4 w-4 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9v2H3v10h18V11h-2V9c0-3.87-3.13-7-7-7zm1 14h-2v-2h2v2zm3-4H8V9c0-2.21 1.79-4 4-4s4 1.79 4 4v3z"/>
                            </svg>
                            Log in
                           <img
                               className="absolute -bottom-7 sm:-bottom-1 sm:right-1 duration-300 sm:translate-y-7 group-hover:translate-y-0"
                               alt="Among Us character"
                               height="30"
                               width="30"
                               src={whiteamogus}
                           />
                          </span>
                        </div>
                      </Link>
                    </div>
                </div> */}
            </div>
          </header>
        </div>
        <div className={": mt-28"}>
          {/*start*/}
          <animated.section
            style={fall}
            className="mb-20 md:mb-40"
          >
            <div className="container mb-10 flex flex-col items-center justify-between">
              <div className="mb-10 flex flex-col items-center justify-center gap-10">
                <div className="relative flex w-full items-center justify-center gap-4">
                  <h1
                    className={`py-4 bg-gradient-to-r bg-clip-text text-6xl ${activeTheme.buttonGradient}  leading-[5.5rem] text-transparent sm:text-8xl`}
                  >
                    Investing <span className="bg-gradient-to-r bg-clip-text text-6xl from-yellow-500 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500  leading-[5.5rem] text-transparent sm:text-8xl">Yellow</span>
                  </h1>
                </div>
                <p className="max-w-[55ch] bg-transparent px-8 text-center font-medium leading-8 text-black/60 dark:text-white/50">
                  <span ref={el}></span>
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/login">
                  <Button
                className="magic-account-button group relative mt-6 overflow-hidden rounded-full px-[2px] py-[26px] duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                type="submit"
                >
                  <span className="h-full gap-4 w-full flex flex-row justify-center items-center text-xl rounded-full bg-white px-4 py-6 text-center text-yellow-500 text-opacity-80 dark:text-yellow-500 dark:text-opacity-80 opacity-80 transition-colors duration-300 dark:bg-black">
                  <Sparkles />Register Now
                  </span>
              </Button>
                  </Link>
                
                </div>
              </div>
              <div>
                <img
                  src={currentImage}
                  className={
                    `${border} shadow-lg cursor-pointer transition-all hover:-translate-y-1 `
                  }
                  alt={"Transitioning Image"}
                />
              </div>
            </div>
          </animated.section>
          <section className="relative overflow-hidden" id="features">
            <animated.div
              style={fade}
              className="container mb-[64px] grid items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center gap-16">
                <div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">
                  <h1 className="text-4xl">
                    <Balancer>What&apos;s in {NAME}?</Balancer>
                  </h1>
                  <p className="text-black/50 dark:text-white/50">
                    <Balancer>
                    All you need to analyze, strategize, and optimize your savings. Effortlessly.
                    </Balancer>
                  </p>
                  <div
                    className={`mx-auto ${activeTheme.button2Gradient} rounded-full bg-gradient-to-r  p-[1px] brightness-90 contrast-150 focus:outline-none focus:${activeTheme.ring} focus-visible:ring-2 dark:brightness-125 dark:contrast-100 sm:block`}
                  >
                    <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80">
                      <span
                        className={`bg-gradient-to-r ${activeTheme.button2Gradient} flex flex-row items-center gap-2 bg-clip-text text-transparent`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-gem mr-1 inline-block h-4 w-4 ${activeTheme.buttonFill}`}><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
                        So many features!{" "}
                        <img
                          className="absolute -bottom-1 right-1 translate-y-7 duration-300 group-hover:translate-y-0"
                          alt="doge smile"
                          height="30"
                          width="30"
                          src={whiteamogus}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 grid w-full gap-8 lg:grid-cols-2">
                <VideoCard
                    description="Leverage our GPT-4 powered AI to dissect your financial standing."
                    bgClass="lg:bg-gradient-to-br"
                    title="AI-Powered Financial Analysis"
                    video={''}
                    className={""}
                />
                  <VideoCard
                      description="Connect to your bank or investment accounts and behold a visual representation of your fiscal behavior."
                      bgClass="lg:bg-gradient-to-br"
                      title="Comprehensive Savings & Investment Overview"
                      video={''}
                      className={""}
                  />
                  <VideoCard
                      description="Get actionable recommendations to bolster your savings and investment strategies with AI generated investment strategies."
                      bgClass="lg:bg-gradient-to-br"
                      title="Tailored Investment Recommendations"
                      video={''}
                      className={""}
                  />
                  <VideoCard
                      description="Engage in enlightening conversations with our chat client. Your path to fiscal wisdom is well within reach."
                      bgClass="lg:bg-gradient-to-br"
                      title="Interactive Financial Guidance"
                      video={''}
                      className={""}
                  />  
                </div>
              </div>
            </animated.div>
          </section>
          {/*end*/}
          <div className={"pt-20"}></div>
        </div>
      </div>
    </>
  );
};

export default Home;
