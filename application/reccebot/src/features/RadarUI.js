import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Uncategorised/Button";


const draw = (context,angle,dst) => {
  context.beginPath();
  for (let i = 0; i < dst; i++) {
    context.lineTo(100+Math.cos(angle) * i, 100+Math.sin(angle) * i * -1);
  }
  context.lineWidth = 2;
  context.strokeStyle = "red";
  context.stroke();
  return;
};

export default function RadarUI() {
  const canvasRef = useRef(null);
  let context;
  
  // const [points, setPoints] = useState();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    canvas.height = 150;
    canvas.width = 200;
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

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <Button onClick={()=>draw(context,Math.random() * Math.PI,90)}>test</Button>
    </>
  );
}
