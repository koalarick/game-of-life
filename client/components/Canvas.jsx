import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  // set colors
  const bg = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 255,
  };
  const fg = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255,
  };

  // create seed and randomly populate
  const seed = {
    width: 600,
    height: 450,
    matrix: [],

    randomize() {
      for (let x = 0; x < this.width; x++) {
        this.matrix[x] = [];
        for (let y = 0; y < this.height; y++) {
          this.matrix[x].push(Math.round(Math.random()));
        }
      }
    },
  };

  seed.randomize();

  console.log(seed);
  const canvasRef = useRef(null);
  const [life, setLife] = useState(seed);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var pixel = ctx.createImageData(seed.width, seed.height);
    var d = pixel.data;

    // paint the scene
    for (let x = 0; x < seed.width; x++) {
      for (let y = 0; y < seed.height; y++) {
        let idx = (x + y * seed.width) * 4;
        if (seed.matrix[x][y]) {
          d[idx + 0] = fg.red; // red
          d[idx + 1] = fg.green; // green
          d[idx + 2] = fg.blue; // blue
          d[idx + 3] = fg.alpha; // alpha
        } else {
          d[idx + 0] = bg.red; // red
          d[idx + 1] = bg.green; // green
          d[idx + 2] = bg.blue; // blue
          d[idx + 3] = bg.alpha; // alpha
        }
      }
    }
    console.log(d);
    ctx.putImageData(pixel, 0, 0);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={425} />
    </div>
  );
};

export default Canvas;
