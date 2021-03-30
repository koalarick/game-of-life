import React, { useRef, useEffect, useState } from "react";
import { Button, Box, IconButton, Stack, Center } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useInterval } from "../helperFunctions";
import Canvas from "./Canvas";
import SpeedControl from "./SpeedControl";
import PlaybackControl from "./PlaybackControl";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(500);

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
    <Center w="100%">
      <Box m={4} alignItems="center">
        <Stack m={4} spacing={4} direction="row" align="center">
          <PlaybackControl
            autoPlay={autoPlay}
            resetWorld={resetWorld.bind(this)}
            togglePlay={togglePlay.bind(this)}
            nextGeneration={nextGeneration.bind(this)}
          />
          <Canvas generation={generation} />
          <SpeedControl
            autoPlaySpeed={autoPlaySpeed}
            setAutoPlaySpeed={setAutoPlaySpeed.bind(this)}
          />
        </Stack>
        <Center></Center>
        <Stat align="center">
          <StatLabel>Generation</StatLabel>
          <StatNumber>{generation}</StatNumber>
        </Stat>
      </Box>
    </Center>
  );
};

export default App;
