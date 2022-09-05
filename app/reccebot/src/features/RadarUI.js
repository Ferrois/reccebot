import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Uncategorised/Button";
import { GlobalContext } from "../context/GlobalContext";
import ReLU from "../utils/ReLU";

const draw = (context, canvas, angle, dst) => {
  if (parseInt(angle) <= 20 || parseInt(angle) >= 160) return initiateCanvas(context, canvas);
  const angleRad = (angle * Math.PI) / 180;
  context.beginPath();
  context.moveTo(
    canvas.width / 2 + Math.cos(angleRad) * 10 *canvas.width/100,
    canvas.height - 10 - Math.sin(angleRad) * 10 * canvas.height/100
  );
  // for (let i = 0; i < dst; i++) {
  context.lineTo(
    canvas.width / 2 + Math.cos(angleRad) * ReLU(parseInt(dst)+5 *canvas.width/100),
    canvas.height - 10 - Math.sin(angleRad) * ReLU(parseInt(dst)+5 *canvas.height/100)
  );
  // }
  context.lineWidth = 3;
  context.strokeStyle = dst < 45 ? "red" : "green";
  // context.strokeStyle = "green";
  context.stroke();
  return;
};

const initiateCanvas = (context, canvas) => {
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#111111";
  context.fill();
  context.beginPath();
  context.moveTo(0, canvas.height - 10);
  context.lineTo(canvas.width, canvas.height - 10);
  context.lineWidth = 2;
  context.strokeStyle = "green";
  context.stroke();
};

export default function RadarUI({ messageHistory }) {
  const {boolData} = useContext(GlobalContext);
  const [bool,setBool] = boolData;

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [context, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);

  // const [points, setPoints] = useState();
  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);
  useEffect(() => {
    // const canvas = canvasRef.current;
    if (!canvas) return;
    setContext(canvas.getContext("2d"));
    if (!context) {
      return;
    }
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.fill();

    let animationFrameId;

    //Our draw came here
    const render = () => {
      // draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    initiateCanvas(context, canvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef.current?.offsetWidth, context]);
  useEffect(() => {
    if (!context) return;
    if (!canvas) return;
    const idx = messageHistory.length - 1;
    if (messageHistory[idx].slice(0, 3) == "usd") {
      const payload = messageHistory[idx].slice(3);
      const [angle, distance] = payload.split(":");
      draw(context, canvas, angle, distance);
      return;
    }
  }, [messageHistory]);
  return (
    <>
    {bool.radar == "0" && <div className="text-red-500 text-xs fixed font-semibold bg-gray-775 rounded-sm p-1">Radar is OFF</div>}
      <div className="w-full overflow-hidden" ref={containerRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
      {/* <Button onClick={() => draw(context, canvas, Math.random() * 180, 90)}>
        .
      </Button> */}
    </>
  );
}
