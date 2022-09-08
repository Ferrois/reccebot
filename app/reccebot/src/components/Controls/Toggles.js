import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../Uncategorised/Button";
import {AiFillSound, AiOutlineCamera} from "react-icons/ai";
import {GiRadarSweep} from "react-icons/gi";

export default function Toggles({handleSendMessage}) {
  const { boolData } = useContext(GlobalContext);
  const [bool, setBool] = boolData;
  const handleToggle = (sensor) => {
    if (sensor === "cam") {
        if (bool.cam === "0") {
            handleSendMessage("**camon");
        }
        if (bool.cam === "1") {
            handleSendMessage("**camoff");
        }
    }
    if (sensor === "radar") {
        if (bool.radar === "0") {
            handleSendMessage("**radon");
        }
        if (bool.radar === "1") {
            handleSendMessage("**radoff");
        }
    }
  };
  return (
    <div className="flex mt-2">
      <Button
        className={`${bool.cam == "1" ? "text-green-500" : "text-red-500"}`}
        onClick={() => handleToggle("cam")}
      >
        <AiOutlineCamera/>
      </Button>
      <Button
        className={`${bool.radar == "1" ? "text-green-500" : "text-red-500"}`}
        onClick={() => handleToggle("radar")}
      >
        <GiRadarSweep/>
      </Button>
      <Button
        className={`text-yellow-300`}
        onClick={() => handleToggle("rcalarm")}
      >
        <AiFillSound/>
      </Button>
    </div>
  );
}
