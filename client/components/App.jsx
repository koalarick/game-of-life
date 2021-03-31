import React, { useRef, useEffect, useState } from "react";
import { Button, Box, IconButton, Stack, Center } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useInterval } from "../helperFunctions";
import Canvas from "./Canvas";
import SpeedControl from "./SpeedControl";
import PlaybackControl from "./PlaybackControl";
import ZoomControl from "./ZoomControl";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [world, setWorld] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(500);
  const [zoom, setZoom] = useState({
    value: 0,
    factor: 1,
    zoomPoint: { x: 0, y: 0 },
  });

  useInterval(
    () => {
      setGeneration(generation + 1);
    },
    autoPlay ? autoPlaySpeed : null
  );

  const nextGeneration = () => {
    setGeneration(generation + 1);
  };

  const togglePlay = () => {
    setAutoPlay(!autoPlay);
  };

  const resetWorld = () => {
    setGeneration(0);
  };

  return (
    <Stack w="100%" m={4} spacing={4} direction="column" align="center">
      <Stack m={4} spacing={4} direction="row" align="center">
        <ZoomControl zoom={zoom} setZoom={setZoom} world={world} />
        <Stack m={4} spacing={4} direction="column" align="center">
          <Stat align="center">
            <StatLabel>Generation</StatLabel>
            <StatNumber>{generation}</StatNumber>
          </Stat>
          <Canvas
            generation={generation}
            zoom={zoom}
            setZoom={setZoom}
            world={world}
            setWorld={setWorld}
          />
          <PlaybackControl
            autoPlay={autoPlay}
            resetWorld={resetWorld.bind(this)}
            togglePlay={togglePlay.bind(this)}
            nextGeneration={nextGeneration.bind(this)}
          />
        </Stack>
        <SpeedControl
          autoPlaySpeed={autoPlaySpeed}
          setAutoPlaySpeed={setAutoPlaySpeed.bind(this)}
        />
      </Stack>
    </Stack>
  );
};

export default App;
