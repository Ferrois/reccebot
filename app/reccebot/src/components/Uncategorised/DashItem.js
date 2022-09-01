import React from "react";

export default function DashItem({ children, heading }) {
  return (
    <div className="bg-gray-825 shadow-md rounded-md m-1 p-1 w-full">
        {heading && <h4 className="text-xl font-opensans text-gray-500">{heading}</h4>}
      {children}
    </div>
  );
}
