import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.font = "40px Courier";
    ctx.fillText("Lets go", 210, 75);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={425} />
    </div>
  );
};

export default Canvas;
