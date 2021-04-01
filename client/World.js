class World {
  constructor(
    rules,
    width = 400,
    height = 400,
    seed = [],
    bgRGBA = { red: 230, green: 212, blue: 168, alpha: 255 },
    fgRGBA = { red: 113, green: 143, blue: 84, alpha: 255 }
  ) {
    this.width = width;
    this.height = height;
    this.bgRGBA = bgRGBA;
    this.fgRGBA = fgRGBA;
    this.matrix = seed;
    this.neighborMin = rules.neighborMin;
    this.neighborMax = rules.neighborMax;
    this.dataURL = null;
  }

  randomize(populationChance = 0.5) {
    for (let x = 0; x < this.width; x++) {
      this.matrix[x] = [];
      for (let y = 0; y < this.height; y++) {
        let random = Math.random();
        random < populationChance
          ? this.matrix[x].push(1)
          : this.matrix[x].push(0);
      }
    }
    return this;
  }

  paint(canvasContext, zoomFactor = 1, zoomPoint = { x: 0, y: 0 }) {
    var pixel = canvasContext.createImageData(this.width, this.height);
    var d = pixel.data;
    var frameLength = this.width / zoomFactor;
    var xBox = Math.floor(zoomPoint.x / frameLength);
    var yBox = Math.floor(zoomPoint.y / frameLength);
    var frame = {
      minX: xBox * frameLength,
      maxX: (xBox + 1) * frameLength,
      minY: yBox * frameLength,
      maxY: (yBox + 1) * frameLength,
    };

    // console.log(zoomPoint);
    // console.log(zoomFactor);
    // console.log(frame);

    let pixelCount = 0;
    for (let x = frame.minX; x < frame.maxX; x++) {
      for (let j = 0; j < zoomFactor; j++) {
        for (let y = frame.minY; y < frame.maxY; y++) {
          for (let i = 0; i < zoomFactor; i++) {
            let idx = pixelCount * 4;
            if (this.matrix[x][y]) {
              d[idx + 0] = this.fgRGBA.red; // red
              d[idx + 1] = this.fgRGBA.green; // green
              d[idx + 2] = this.fgRGBA.blue; // blue
              d[idx + 3] = this.fgRGBA.alpha; // alpha
            } else {
              d[idx + 0] = this.bgRGBA.red; // red
              d[idx + 1] = this.bgRGBA.green; // green
              d[idx + 2] = this.bgRGBA.blue; // blue
              d[idx + 3] = this.bgRGBA.alpha; // alpha
            }
            pixelCount++;
          }
        }
      }
    }
    canvasContext.putImageData(pixel, 0, 0);
  }

  tick(numTicks = 1) {
    let newMatrix = this.matrix.map((arr) => {
      return arr.slice();
    });

    for (let i = 0; i < numTicks; i++) {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let liveNeighbors = this._countLiveNeighbors(x, y);
          if (this.matrix[x][y]) {
            if (
              liveNeighbors >= this.neighborMin &&
              liveNeighbors <= this.neighborMax
            ) {
              newMatrix[x][y] = 1;
            } else {
              newMatrix[x][y] = 0;
            }
          } else {
            if (liveNeighbors === this.neighborMax) {
              newMatrix[x][y] = 1;
            } else {
              newMatrix[x][y] = 0;
            }
          }
        }
      }
    }

    return newMatrix;
  }

  _countLiveNeighbors(x, y) {
    return this._findNeighbors(x, y).length;
  }

  _findNeighbors(origX, origY, wantDead = false, wantAlive = true) {
    var neighbors = [];
    var xValid, yValid, xAdj, yAdj;

    const addToResults = (x, y) => {
      let alive = this.matrix[x][y];
      if ((alive && wantAlive) || (!alive && wantDead)) neighbors.push([x, y]);
    };

    for (let x = origX - 1; x <= origX + 1; x++) {
      for (let y = origY - 1; y <= origY + 1; y++) {
        if (origX !== x || origY !== y) {
          x >= 0 && x <= this.width - 1 ? (xValid = true) : (xValid = false);
          y >= 0 && y <= this.width - 1 ? (yValid = true) : (yValid = false);
          if (xValid && yValid) {
            addToResults(x, y);
          } else {
            if (!xValid) {
              x < 0 ? (xAdj = this.width - 1) : (xAdj = 0);
            } else {
              xAdj = x;
            }
            if (!yValid) {
              y < 0 ? (yAdj = this.height - 1) : (yAdj = 0);
            } else {
              yAdj = y;
            }
            // console.log(
            //   `xVal = ${xValid} x = ${x} xAdj = ${xAdj} yVal = ${yValid} y = ${y} yAdj = ${yAdj}`
            // );
            addToResults(xAdj, yAdj);
          }
        }
      }
    }

    return neighbors;
  }
}

export default World;
