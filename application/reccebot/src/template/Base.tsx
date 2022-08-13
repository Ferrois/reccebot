import React from "react";
import { Helmet } from "react-helmet";

interface BaseProps {
  children?: React.ReactNode;
  config: { title: string; description: string };
}

export default function Base(props: BaseProps) {
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
