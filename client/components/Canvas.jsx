import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({ generation }) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const [world, setWorld] = useState(null);

  useEffect(() => {
    var newWorld = new World();
    console.log(newWorld);
    setWorld(newWorld.randomize());
  }, []);

  useEffect(() => {
    repaint();
  }, [generation]);

  useEffect(() => {
    repaint();
  }, [world]);

  const repaint = () => {
    if (world) {
      world.paint(canvas.getContext("2d"));
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={650} height={400} />
    </div>
  );
};

export default Canvas;
