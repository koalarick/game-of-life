import React from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const SpeedControl = ({ autoPlaySpeed, setAutoPlaySpeed }) => {
  const adjSpeed = (adjustment) => {
    setAutoPlaySpeed(autoPlaySpeed + adjustment);
  };

  return (
    <Stack m={4} spacing={4} direction="column" align="center">
      <IconButton
        onClick={() => adjSpeed(-100)}
        aria-label="Slower"
        icon={<FiArrowUpCircle size={30} />}
        colorScheme="white"
        color="teal"
        size="md"
        isDisabled={autoPlaySpeed === 100 ? true : false}
      ></IconButton>
      <Stat align="center">
        <StatLabel>Speed</StatLabel>
        <StatNumber>{(1100 - autoPlaySpeed) / 100}</StatNumber>
      </Stat>
      <IconButton
        onClick={() => adjSpeed(100)}
        aria-label="Slower"
        icon={<FiArrowDownCircle size={30} />}
        colorScheme="white"
        color="teal"
        size="md"
        isDisabled={autoPlaySpeed === 1000 ? true : false}
      ></IconButton>
    </Stack>
  );
};

export default SpeedControl;
