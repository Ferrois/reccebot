import React from "react";
import {TbRobot} from "react-icons/tb";

export default function Authenticating() {
  return (
    <div className="min-h-screen bg-gray-800 overflow-x-hidden w-full text-white h-auto flex justify-center items-center text-2xl flex-col">
        <div>Unauthenticated...</div>
        <div className="text-4xl loadinglogospin"><TbRobot/></div>
    </div>
  );
}
