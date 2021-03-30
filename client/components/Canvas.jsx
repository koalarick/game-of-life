import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({ tick }) => {
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
  }, [tick]);

  useEffect(() => {
    repaint();
  }, [world]);

  const repaint = () => {
    if (world) {
      world.paint(canvas.getContext("2d"));
      console.log(world.tick(1));
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={425} />
    </div>
  );
};

export default Canvas;
