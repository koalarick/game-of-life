class World {
  constructor(
    width = 10,
    height = 10,
    bgRGBA = { red: 255, green: 255, blue: 255, alpha: 255 },
    fgRGBA = { red: 0, green: 0, blue: 0, alpha: 255 },
    seed = []
  ) {
    this.width = width;
    this.height = height;
    this.bgRGBA = bgRGBA;
    this.fgRGBA = fgRGBA;
    this.matrix = seed;
    this.neighborMin = 2;
    this.neighborMax = 3;
  }

  randomize() {
    for (let x = 0; x < this.width; x++) {
      this.matrix[x] = [];
      for (let y = 0; y < this.height; y++) {
        this.matrix[x].push(Math.round(Math.random()));
      }
    }
    return this;
  }

  paint(canvasContext) {
    var pixel = canvasContext.createImageData(this.width, this.height);
    var d = pixel.data;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let idx = (x + y * this.width) * 4;
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
      }
    }
    canvasContext.putImageData(pixel, 0, 0);
  }

  tick(numTicks = 1) {
    // for num of ticks
    // loop through each cell in matrix
    // if countLiveNeighbors does not follow rule
    // set cell to zero
    // set cell to 1
    // return this
    let newMatrix = this.matrix.map((arr) => {
      return arr.slice();
    });

    for (let i = 0; i < numTicks; i++) {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let liveNeighbors = this._countLiveNeighbors(x, y);
          if (
            liveNeighbors >= this.neighborMin &&
            liveNeighbors <= this.neighborMax
          ) {
            //console.log(`lives ${liveNeighbors}`);
            newMatrix[x][y] = 1;
          } else {
            //console.log(`dies ${liveNeighbors}`);
            newMatrix[x][y] = 0;
          }
        }
      }
    }

    return newMatrix;
  }

  _countLiveNeighbors(x, y) {
    // return length of _findNeighbors(x,y)
    return this._findNeighbors(x, y).length;
  }

  _findNeighbors(origX, origY, wantDead = false, wantAlive = true) {
    // for x goes from -1 to 1
    // for y goes from -1 to 1
    // if x,y is a valid coordinate push to results if meet criteria
    // else if y is out of bounds then run the criteria check on y min or y max and push if valid
    // else if x is out of bounds then run the criteria check on x min or x max and push if valid
    // return an array of neighbors coordinates meeting criteria
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
