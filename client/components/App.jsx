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

  const next = () => {
    setGeneration(generation + 1);
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
            <Button onClick={next} colorScheme="teal" size="lg">
              Next
            </Button>
            <Button
              onClick={() => setAutoPlay(!autoPlay)}
              colorScheme="teal"
              size="md"
            >
              AutoPlay
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
