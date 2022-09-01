import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";

export const GlobalContext = createContext(null);

// interface ContextType {
//   sessionData: any;
//   setSessionData: () => void;
//   isGuest: boolean;
//   setIsGuest: () => void;
// }

export default function GlobalProvider(props) {
  const [auth, setAuth] = useLocalStorage("auth", { acc: "" });
  const [gps,setGps] = useLocalStorage("gps",{lat:0,lng:0,lastSeen:0});
  const [options, setOptions] = useSessionStorage("options", {showAuth : true});

  const optionData = [options,setOptions];
  const passport = [auth,setAuth];
  const gpsData = [gps,setGps];
  
  return (
    <GlobalContext.Provider value={{passport,gpsData,optionData}}>
      {props.children}
    </GlobalContext.Provider>
  );
}
