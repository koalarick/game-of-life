import React from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const ZoomControl = ({ zoom, setZoom, world }) => {
  const increaseZoom = () => {
    let newZoom = {
      value: zoom.value + 1,
      factor: 2 ** (zoom.value + 1),
      zoomPoint: { x: 0, y: 0 },
    };
    setZoom(newZoom);
  };

  const decreaseZoom = () => {
    let newZoom = {
      value: zoom.value - 1,
      factor: 2 ** (zoom.value - 1),
      zoomPoint: { x: 0, y: 0 },
    };
    setZoom(newZoom);
  };

  return (
    <Stack m={4} spacing={4} direction="column" align="center">
      <IconButton
        onClick={increaseZoom}
        aria-label="Increase Zoom"
        icon={<AiOutlineZoomIn size={30} />}
        colorScheme="teal"
        size="md"
        isDisabled={zoom.value < 4 ? false : true}
      ></IconButton>
      <Stat align="center">
        <StatLabel>Zoom</StatLabel>
        <StatNumber>{`${zoom.factor}x`}</StatNumber>
      </Stat>
      <IconButton
        onClick={decreaseZoom}
        aria-label="Slower"
        icon={<AiOutlineZoomOut size={30} />}
        colorScheme="teal"
        size="md"
        isDisabled={zoom.value > 0 ? false : true}
      ></IconButton>
    </Stack>
  );
};

export default ZoomControl;
