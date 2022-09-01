import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import KeyInput from "../components/Auth/KeyInput";
import CWrap from "../components/Uncategorised/CWrap";
import config from "../config";
import Base from "../template/Base";
import { useNavigate } from "react-router";
import { GlobalContext } from "../context/GlobalContext";
import Logo from "./../assets/reccebotsvg.svg"

const meta = {
  title: "Home",
  description: "Home page of the reccebot app",
};

export default function Home() {
  const navigate = useNavigate();
  const {passport} = useContext(GlobalContext);
  const [auth, setAuth] = passport;


  const handleKeyInput = async (e, key) => {
    e?.preventDefault();
    if (key == "") return;
    if (key == "69420") return toast("YOU FOUND THE SECRET KEYCODE!!!!!!!! jk but its cool tho");
    const response = await axios.post(`${config.apiURL}/auth`, { input: key });
    if (!response.data.success) return toast.error("Invalid Key");
    // toast.success("Valid key");
    setAuth({ acc: key });
    navigate("/dash");
  };
  useEffect(() => {
    handleKeyInput(null,auth.acc);
  }, [])
  
  return (
    <Base config={meta} keyrequired={false}>
      <CWrap vertical>
        <img src={Logo} className="pb-5"></img>
        <div className="text-xl text-white">
          Reccebot (2022 NRC)
        </div>
        <KeyInput handleKeyInput={handleKeyInput} />
      </CWrap>
    </Base>
  );
}
