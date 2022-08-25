import React from "react";
import { Helmet } from "react-helmet";


export default function Base(props) {
  return (
    <>
      <Helmet>
        <title>{props.config.title}</title>
        <meta name="description" content={props.config.description} />
      </Helmet>
      <div className="min-h-screen bg-gray-800 overflow-x-hidden w-screen text-white">
        {/* {props.config.hasHeader && <Header isMobile={false} />} */}
        {props.children}
      </div>
    </>
  );
}
