import React, { useRef, useEffect, useState } from "react";
import { Button, Box, IconButton, Stack, Center } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useInterval } from "../helperFunctions";
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdRefresh,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { AiFillStepForward } from "react-icons/ai";
import Canvas from "./Canvas";
import SpeedControl from "./SpeedControl";

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
          <Stack m={4} spacing={4} direction="column" align="center">
            <IconButton
              onClick={resetWorld}
              aria-label="Refresh"
              colorScheme="teal"
              icon={<MdRefresh size={30} />}
              size="md"
              isDisabled={autoPlay}
            ></IconButton>
            <IconButton
              onClick={togglePlay}
              aria-label="Start AutoPlay"
              icon={
                autoPlay ? (
                  <MdPauseCircleFilled size={30} />
                ) : (
                  <MdPlayCircleFilled size={30} />
                )
              }
              colorScheme="teal"
              size="lg"
            ></IconButton>
            <IconButton
              onClick={nextGeneration}
              aria-label="Step Forward"
              icon={<AiFillStepForward size={30} />}
              colorScheme="teal"
              size="md"
              isDisabled={autoPlay}
            ></IconButton>
          </Stack>
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
