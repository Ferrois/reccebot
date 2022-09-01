import React from "react";

// interface IProps {
//     onClick?: (params:any) => any;
//     textColor?: string;
//     text?: string;
//     className?: string;
//     children?: React.ReactNode;
//     type?: "button" | "submit" | "reset";
// }

export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={
        "bg-gray-700 rounded-md text-white font-opensans text-2xl hover:bg-gray-600 active:scale-105 transition shadow-md p-1 px-3 " +
        props.className
      }
    >
      {props.children}
    </button>
  );
}
