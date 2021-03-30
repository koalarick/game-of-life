// Helper Functions for the generating life

class World {
  constructor(
    width = 600,
    height = 450,
    bgRGBA = { red: 255, green: 255, blue: 255, alpha: 255 },
    fgRGBA = { red: 0, green: 0, blue: 0, alpha: 255 },
    seed = []
  ) {
    this.width = width;
    this.height = height;
    this.bgRGBA = bgRGBA;
    this.fgRGBA = fgRGBA;
    this.matrix = seed;
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
}

export default World;
