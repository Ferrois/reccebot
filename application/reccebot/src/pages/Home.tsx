import React, { SyntheticEvent } from "react";
import CWrap from "../components/Uncategorised/CWrap";
import Base from "../template/Base";
import KeyInput from "../components/Auth/KeyInput";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

const meta = {
  title: "Home",
  description: "Home page of the reccebot app",
};

export default function Home() {
  const handleKeyInput = async (e: SyntheticEvent, key: string) => {
    e.preventDefault();
    const response = await axios.post(`${config.apiURL}/auth`, { input: key });
    if (!response.data.success) return toast.error("Invalid key");
    toast.success("Valid key");
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
