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
    autoPlay ? 2000 : null
  );

  const nextClick = () => {
    setGeneration(generation + 1);
  };

  const autoPlayClick = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <Center w="100%">
      <Box m={4} alignItems="center">
        <Canvas generation={generation} />
        <Center>
          <Stack m={4} spacing={4} direction="row" align="center">
            <Button colorScheme="teal" size="md">
              Reset
            </Button>
            <Button onClick={autoPlayClick} colorScheme="teal" size="lg">
              {autoPlay ? "Pause" : "Play"}
            </Button>
            <Button onClick={nextClick} colorScheme="teal" size="md">
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
