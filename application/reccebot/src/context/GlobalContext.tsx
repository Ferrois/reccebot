import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const GlobalContext = createContext(null);

// interface ContextType {
//   sessionData: any;
//   setSessionData: () => void;
//   isGuest: boolean;
//   setIsGuest: () => void;
// }

export default function GlobalProvider(props: any) {
  const [auth, setAuth] = useLocalStorage("auth", { acc: "guest" });
  const passport:Array<any> = [auth,setAuth];
  return (
    // @ts-ignore
    <GlobalContext.Provider value={{passport}}>
      {props.children}
    </GlobalContext.Provider>
  );
}
