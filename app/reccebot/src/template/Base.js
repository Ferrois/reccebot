import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CWrap from "../components/Uncategorised/CWrap";
import config from "../config";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import Authenticating from "../components/Auth/Authenticating";
import { useNavigate } from "react-router";

export default function Base(props) {
  const { passport, optionData } = useContext(GlobalContext);
  const [auth, setAuth] = passport;
  const [options, setOptions] = optionData;
  const [authenticated, setAuthenticated] = useState("loading");
  const navigate = useNavigate();
  const validateKey = async () => {
    const response = await axios.post(`${config.apiURL}/auth`, {
      input: auth?.acc || " ",
    });
    const timeout = setTimeout(() => {
      setAuthenticated("timeout");
      toast.error("Timeout: no server response. Try again!");
      navigate("/");
    }, 10000);

    if (!response.data.success && authenticated !== "timeout") {
      toast.error("Invalid Authentication Token Detected");
      setAuthenticated("invalid");
      navigate("/");
      return clearTimeout(timeout);
    }
    if (response.data.success && authenticated !== "timeout") {
      setAuthenticated("authenticated");
      if (options.showAuth) {
        toast.success("Authenticated!");
        setOptions({ showAuth: false });
      }
      return clearTimeout(timeout);
    }
  };
  // console.log("render");
  useEffect(() => {
    if (!props.keyrequired && authenticated !== "authenticated") return;
    validateKey();
  }, []);

  // if (props.keyrequired == true && authenticated !== "authenticated") {
  //   if (authenticated === "loading") {
  //     validateKey();
  //     console.log("check");
  //   }
  // }

  return (
    <>
      <Helmet>
        <title>{props.config.title}</title>
        <meta name="description" content={props.config.description} />
      </Helmet>
      {props.keyrequired == true && authenticated !== "authenticated" ? (
        <Authenticating/>
      ) : (
        <div className="min-h-screen bg-gray-800 overflow-x-hidden w-full text-white h-auto">
          {/* {props.config.hasHeader && <Header isMobile={false} />} */}
          <CWrap>
            <div className="w-11/12">{props.children}</div>
          </CWrap>
        </div>
      )}
    </>
  );
}
