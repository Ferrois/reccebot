import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import KeyInput from "../components/Auth/KeyInput";
import CWrap from "../components/Uncategorised/CWrap";
import config from "../config";
import Base from "../template/Base";
import { useNavigate } from "react-router";

const meta = {
  title: "Home",
  description: "Home page of the reccebot app",
};

export default function Home() {
    const navigate = useNavigate();

  const handleKeyInput = async (e, key) => {
    e.preventDefault();
    const response = await axios.post(`${config.apiURL}/auth`, { input: key });
    if (!response.data.success) return toast.error("Invalid key");
    toast.success("Valid key");
    // setAuth({ acc: key });
    navigate("/dash")
  };
  return (
    <Base config={meta}>
      <CWrap vertical>
        <div className="text-xl text-white">
          Reccebot by Bertrand, Ferrois, Ethan
        </div>
        <KeyInput handleKeyInput={handleKeyInput} />
      </CWrap>
    </Base>
  );
}
