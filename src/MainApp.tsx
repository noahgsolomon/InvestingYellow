import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import { FC, useEffect, useState } from "react";
import NotFound from "./NotFound.tsx";
import Login2 from "./pages/Login/Login2.tsx";
import Themes from "./theme/Themes.tsx";
import Loader from "Components/Loader/Loader.tsx";

const MainApp: FC = () => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token && window.location.pathname != "/home") {
      window.location.href = "/home";
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/home" element={<Themes />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainApp;
