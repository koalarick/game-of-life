import React, { useRef, useEffect, useState } from "react";
import { Button, Box, IconButton, Stack, Center } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useInterval } from "../helperFunctions";
import Canvas from "./Canvas";
import SpeedControl from "./SpeedControl";
import PlaybackControl from "./PlaybackControl";
import ZoomControl from "./ZoomControl";
import SettingsMenu from "./SettingsMenu";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [world, setWorld] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(500);
  const [hasChanges, setHasChanges] = useState(false);
  const [randomChance, setRandomChance] = useState(0.0025);
  const [rules, setRules] = useState({ neighborMin: 2, neighborMax: 2 });
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
            randomChance={randomChance}
            hasChanges={hasChanges}
            setHasChanges={setHasChanges}
            rules={rules}
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
      <SettingsMenu
        setRandomChance={setRandomChance}
        randomChance={randomChance}
        generation={generation}
        setGeneration={setGeneration}
        setHasChanges={setHasChanges}
        rules={rules}
        setRules={setRules}
      />
    </Stack>
  );
};

export default App;
