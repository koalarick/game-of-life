import React, { useRef, useEffect, useState } from "react";
import { Button, Box, Stack, Center } from "@chakra-ui/react";

import Canvas from "./Canvas";

const App = () => {
  const [generation, setGeneration] = useState(0);

  return (
    <Center w="100%">
      <Box m={4} alignItems="center">
        <Canvas tick={generation} />
        <Center>
          <Stack m={4} spacing={4} direction="row" align="center">
            <Button colorScheme="teal" size="md">
              Reset
            </Button>
            <Button colorScheme="teal" size="lg">
              Next
            </Button>
            <Button colorScheme="teal" size="md">
              Back
            </Button>
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};

export default App;
