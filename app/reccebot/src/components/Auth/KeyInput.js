import React, { useState } from "react";
import Input from "../Uncategorised/Input";
import Button from "../Uncategorised/Button";

// interface IMain {
//   handleKeyInput: (e:SyntheticEvent,props:any) => any;
// }

export default function KeyInput(props) {
  const [key, setKey] = useState("");
  return (
    <form onSubmit={(e)=>props.handleKeyInput(e,key)} className="flex flex-col">
      <Input
        placeholder="Enter your key"
        onChange={(e)=>setKey(e.target.value)}
        value={key}
        className="w-full rounded-lg text-xl p-2 text-black"
        classnamediv="bg-gray-100 ml-4 mr-4 mt-2 mb-2 rounded-lg shadow-md"
      />
      <Button type="submit">Go</Button>
    </form>
  );
}
