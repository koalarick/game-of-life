import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({
  generation,
  world,
  setWorld,
  zoom,
  setZoom,
  randomChance,
  hasChanges,
  setHasChanges,
  rules,
}) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

  // tick
  useEffect(() => {
    console.log("ticking");
    if (!generation || hasChanges) {
      var newWorld = new World(rules);
      setWorld(newWorld.randomize(randomChance));
    } else if (world && generation) {
      let newWorld = new World(rules, 400, 400, world.tick(1));
      setWorld(newWorld);
    }
    setHasChanges(false);
  }, [generation, hasChanges]);

  // repaint
  useEffect(() => {
    if (world) {
      world.paint(canvas.getContext("2d"), zoom.factor, zoom.zoomPoint);
      world.dataURL = canvas.toDataURL();
      console.log(world.dataURL.length);
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
    const y = Math.floor(event.clientX - rect.left);
    const x = Math.floor(event.clientY - rect.top);
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
