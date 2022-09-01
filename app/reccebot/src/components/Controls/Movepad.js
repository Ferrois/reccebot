import React from "react";
import Button from "../Uncategorised/Button";
import {
  AiOutlineCaretUp,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineCaretDown,
} from "react-icons/ai";

export default function Movepad({ className, handleSendMessage }) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <div className="col-span-1 flex items-center">
        <Button onClick={() => handleSendMessage("rcmovea")}>
          <AiOutlineCaretLeft />
        </Button>
      </div>
      <div className="col-span-1 grid grid-rows-2 gap-2">
        <div className="row-span-1">
          <Button onClick={() => handleSendMessage("rcmovew")}>
            <AiOutlineCaretUp />
          </Button>
        </div>
        <div className="row-span-1">
          <Button onClick={() => handleSendMessage("rcmoves")}>
            <AiOutlineCaretDown />
          </Button>
        </div>
      </div>
      <div
        className="col-span-1 flex items-center"
        onClick={() => handleSendMessage("rcmoved")}
      >
        <Button>
          <AiOutlineCaretRight />
        </Button>
      </div>
    </div>
  );
}
