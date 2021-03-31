import React, { useRef, useEffect, useState } from "react";
import World from "../World";

const Canvas = ({ generation }) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const [world, setWorld] = useState(null);
  const [zoom, setZoom] = useState({
    value: 0,
    factor: 1,
    zoomPoint: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (!generation) {
      var newWorld = new World();
      setWorld(newWorld.randomize());
    } else if (world) {
      let newWorld = new World(400, 400, world.tick(1));
      setWorld(newWorld);
    }
  }, [generation]);

  useEffect(() => {
    if (world)
      world.paint(canvas.getContext("2d"), zoom.factor, zoom.zoomPoint);
  }, [world]);

  const adjZoom = (event) => {
    console.log(zoom);
    if (zoom.value < 4) {
      let newZoomPoint = getCursorPosition(canvas, event);
      let newZoomValue = zoom.value + 1;
      let newZoomFactor = 2 ** newZoomValue;
      console.log({ newZoomValue, newZoomFactor, newZoomPoint });
      world.paint(canvas.getContext("2d"), newZoomFactor, newZoomPoint);
      setZoom({
        value: newZoomValue,
        factor: newZoomFactor,
        zoomPoint: newZoomPoint,
      });
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
