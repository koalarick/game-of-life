import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({ generation }) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const [world, setWorld] = useState(null);

  useEffect(() => {
    var newWorld = new World();
    setWorld(newWorld.randomize());
  }, []);

  useEffect(() => {
    // when we change generation we need to tick
    if (world) {
      let newWorld = new World(650, 400, world.tick(1));
      setWorld(newWorld);
    }
  }, [generation]);

  useEffect(() => {
    // after a tick and world is updated, we need to repaint
    repaint();
  }, [world]);

  const repaint = () => {
    if (world) {
      console.log(world);
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
