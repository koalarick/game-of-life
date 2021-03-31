import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({ generation, world, setWorld, zoom, setZoom }) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

  // tick
  useEffect(() => {
    if (!generation) {
      var newWorld = new World();
      setWorld(newWorld.randomize());
    } else if (world) {
      let newWorld = new World(400, 400, world.tick(1));
      setWorld(newWorld);
    }
  }, [generation]);

  // repaint
  useEffect(() => {
    if (world) {
      world.paint(canvas.getContext("2d"), zoom.factor, zoom.zoomPoint);
    }
  }, [world, zoom]);

  const adjZoom = (event) => {
    if (zoom.value < 4) {
      let newZoom = {
        value: zoom.value + 1,
        factor: 2 ** (zoom.value + 1),
        zoomPoint: getCursorPosition(canvas, event),
      };
      setZoom(newZoom);
    }
  };

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    console.log("x: " + x + " y: " + y);
    return { x, y };
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          adjZoom(e);
        }}
        width={400}
        height={400}
      />
    </div>
  );
};

export default Canvas;
