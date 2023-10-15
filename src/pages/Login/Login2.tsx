import { FC, useCallback, useEffect, useState } from "react";
import {
  LIGHT_THEME_KEY,
  DARK_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants";
import Balancer from "react-wrap-balancer";
import { Link } from "react-router-dom";
import { CircleDollarSign } from "lucide-react";
import styles from "./login.module.css";
import { Button } from "../../@/components/ui/button.tsx";
import { toggleTheme } from "../../util/toggleTheme.ts";
import { NAME } from "../../../config.ts";
import plaid from '../../assets/plaid.png';
import plaidDark from '../../assets/plaiddark.png';
import { usePlaidLink } from 'react-plaid-link';
import Loader from "Components/Loader/Loader.tsx";

const Login2: FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [, setLinkTokenError] = useState(null);
  const [, setProducts] = useState([]);
  const [paymentInitiation, setPaymentInitiation] = useState(false);
  const [, setItemId] = useState("");
  const [, setAccessToken] = useState("");
  const [, setIsItemAccess] = useState(false);
  const [, setLinkSuccess] = useState(false);

  const onSuccess = useCallback(
    (public_token: string) => {
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch("https://loadbalancer.codefoli.com/api/set_access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
        });
        if (!response.ok) {
          setIsItemAccess(false);
          return;
        }
        const data = await response.json();
        console.log(data);
        setItemId(data.item_id);
        setAccessToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        window.location.href = '/home';
      };
  
      if (paymentInitiation){
        setIsItemAccess(true);
      } else {
        exchangePublicTokenForAccessToken();
      }
      
      setLinkSuccess(true);
      window.history.pushState("", "", "/");
    },
    []
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
    onExit() {
      setLoading(false);
    }    
  };

  const { open, ready } = usePlaidLink(config);

  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
      (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
        | typeof LIGHT_THEME_KEY
        | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  ////////

  const generateToken = useCallback(
    async (isPaymentInitiation: any) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "https://loadbalancer.codefoli.com/api/create_link_token_for_payment"
        : "https://loadbalancer.codefoli.com/api/create_link_token";
      const response = await fetch(path, {
        method: "POST",
      });
      console.log(response)
      if (!response.ok) {
        setLinkToken(null);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data) {
        if (data.error != null) {
          setLinkToken(null);
          setLinkTokenError(data.error);
          return;
        }
        setLinkToken(data.link_token);
      }
      // Save the link_token to be used later in the Oauth flow.
      localStorage.setItem("link_token", data.link_token);
    },
    []
  );

  const getInfo = useCallback(async () => {
    const response = await fetch("https://loadbalancer.codefoli.com/api/info", { method: "POST" });
    console.log(response);
    const data = await response.json();
    console.log(data)
    const paymentInitiation: boolean = data.products.includes(
      "payment_initiation"
    );
    setProducts(data.products);
    setPaymentInitiation(paymentInitiation);
  }, []);

  useEffect(() => {
    const init = async () => {
      await getInfo(); // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        const linkTokenStorage = localStorage.getItem("link_token");
        setLinkToken(linkTokenStorage);
        return;
      }
      generateToken(paymentInitiation);
    };
    init();
  }, []);


  ////////

  if (loading) {
    return <Loader />;
  }


  return (
    <div className={"h-screen"}>
      <header>
        <div
          className={
            "mx-5 flex flex-row items-center justify-between pt-10 md:mx-20"
          }
        >
          <div className={"flex cursor-pointer flex-row items-center gap-4"}>
            <Link to="/">
              <CircleDollarSign className="w-12 h-12 hover:opacity-80 transition-all"/>
            </Link>
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
                className="h-7 w-7 cursor-pointer transition-all hover:opacity-80"
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
                className="h-7 w-7 cursor-pointer transition-all hover:opacity-80"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </div>
        </div>
      </header>
      <main className="relative mt-32 flex flex-col items-center justify-center sm:px-16 md:mt-48 md:px-0">
        <div className="mb-10">
              <h1 className="max-w-[20ch] text-3xl text-neutral-950 dark:text-neutral-50 md:text-5xl">
                <Balancer className="text-center leading-snug">
                Connect with your bank to unlock the full potential of the{" "}
                  <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text font-black text-transparent dark:from-blue-400 dark:to-emerald-400">
                    {NAME}
                  </span>
                </Balancer>
              </h1>
        </div>
        <div className={"flex h-full w-full items-center justify-center"}>
          <div
            className={`${styles.waitlistBackground} fixed left-0 top-0 -z-10 h-full w-full`}
          />
            <div className="flex w-full max-w-[500px] flex-col items-center justify-center text-center">
              <Button
                      onClick={() => {
                        setLoading(true);
                        open();
                      }} disabled={!ready}
                      className="w-full h-full wl-form-button group relative mt-6 max-w-[80%] overflow-hidden rounded-xl px-[2px] py-[2px] transition-shadow duration-300 hover:shadow-[0_0.5rem_2rem_-0.75rem_#3178c6] dark:hover:shadow-[0_0.5rem_2rem_-0.75rem_#5198f6]"
                      type="submit"
                    >
                      <span className="h-full gap-4 w-full flex flex-row justify-center items-center text-xl rounded-[10px] bg-white px-4 py-2 text-center text-black opacity-80 transition-colors duration-300 group-hover:bg-blue-100 dark:bg-black dark:text-white group-hover:dark:bg-cyan-950">
                        <img className={'w-[10%]'} src={theme === DARK_THEME_KEY ? plaidDark : plaid} alt="plaid"/>Continue with Plaid
                      </span>
              </Button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Login2;
