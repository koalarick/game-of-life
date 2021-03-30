import React, { useRef, useEffect, useState } from "react";
import { Button, Box, Stack, Center } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useInterval } from "../helperFunctions";

import Canvas from "./Canvas";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useInterval(
    () => {
      setGeneration(generation + 1);
    },
    autoPlay ? 100 : null
  );

  const nextClick = () => {
    setGeneration(generation + 1);
  };

  const autoPlayClick = () => {
    setAutoPlay(!autoPlay);
  };

  const resetClick = () => {
    setGeneration(0);
  };

  return (
    <Center w="100%">
      <Box m={4} alignItems="center">
        <Canvas generation={generation} />
        <Center>
          <Stack m={4} spacing={4} direction="row" align="center">
            <Button
              onClick={resetClick}
              colorScheme="teal"
              size="md"
              isDisabled={autoPlay}
            >
              Reset
            </Button>
            <Button onClick={autoPlayClick} colorScheme="teal" size="lg">
              {autoPlay ? "Pause" : "Play"}
            </Button>
            <Button
              onClick={nextClick}
              colorScheme="teal"
              size="md"
              isDisabled={autoPlay}
            >
              Step 1
            </Button>
          </Stack>
        </Center>
        <Stat align="center">
          <StatLabel>Generation</StatLabel>
          <StatNumber>{generation}</StatNumber>
        </Stat>
      </Box>
    </Center>
  );
};

export default App;
