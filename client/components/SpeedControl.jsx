import React from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const SpeedControl = ({ autoPlaySpeed, setAutoPlaySpeed }) => {
  const increaseSpeed = () => {
    setAutoPlaySpeed(autoPlaySpeed - 100);
  };

  const decreaseSpeed = () => {
    setAutoPlaySpeed(autoPlaySpeed + 100);
  };

  return (
    <Stack m={4} spacing={4} direction="column" align="center">
      <IconButton
        onClick={increaseSpeed}
        aria-label="Slower"
        icon={<MdKeyboardArrowUp size={30} />}
        colorScheme="teal"
        size="md"
        isDisabled={autoPlaySpeed === 100 ? true : false}
      ></IconButton>
      <Stat align="center">
        <StatLabel>Speed</StatLabel>
        <StatNumber>{(1100 - autoPlaySpeed) / 100}</StatNumber>
      </Stat>
      <IconButton
        onClick={decreaseSpeed}
        aria-label="Slower"
        icon={<MdKeyboardArrowDown size={30} />}
        colorScheme="teal"
        size="md"
        isDisabled={autoPlaySpeed === 1000 ? true : false}
      ></IconButton>
    </Stack>
  );
};

export default SpeedControl;