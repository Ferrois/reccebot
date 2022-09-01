import React from "react";
import { toast } from "react-toastify";
import Button from "../Uncategorised/Button";
import Input from "../Uncategorised/Input";

export default function SendCommand({ className, handleSendMessage }) {
  const [command, setCommand] = React.useState("");
  const sendCommand = (e) => {
    e.preventDefault();
    if (command == "" || command == " ")
      return toast.error("Please enter a command");
    handleSendMessage("**" + command);
    setCommand("");
  };

  return (
    <form onSubmit={(e) => sendCommand(e)} className="flex">
      <Input onChange={(e) => setCommand(e.target.value)} value={command} placeholder="Command" />
      <Button type="submit">Send</Button>
    </form>
  );
}
