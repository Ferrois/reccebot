import React from "react";

interface IProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  classnamediv?: string;
}

export default function Input(props: IProps) {
  return (
    <div className={"bg-gray-100 ml-4 mr-4 mt-2 mb-2 rounded-lg shadow-md "+props.classnamediv}>
      <input type="text" className="w-full rounded-lg text-xl p-2" {...props}/>
    </div>
  );
}
