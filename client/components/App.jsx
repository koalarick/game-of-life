import React, { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";

const App = () => {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <p>Hello World!</p>
      <Canvas tick={tick} />
    </div>
  );
};

export default App;
