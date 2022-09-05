import React, { useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Camera({ messageHistory }) {
  const {boolData} = useContext(GlobalContext);
  const [bool,setBool] = boolData;
  const [image, setImage] = React.useState("iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
  useEffect(() => {
    if (messageHistory?.length == 1) return;
    const idx = messageHistory.length - 1;
    if (messageHistory[idx]?.slice(0, 3) == "img") {
      setImage(messageHistory[idx].slice(3));
    }
  }, [messageHistory?.length]);
  return (
    <>
      {bool.cam == "0" && <div className="text-red-500 text-xs fixed font-semibold bg-gray-775 rounded-sm p-1">Camera is OFF</div>}
    <img
      src={`data:image/png;base64, ${image}`}
      alt="Camera Data from Reccebot"
      className="w-full aspect-video rounded-md"
    />
    </>
  );
}
