import React from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdRefresh,
  MdSave,
} from "react-icons/md";
import { AiFillStepForward } from "react-icons/ai";

const PlaybackControl = ({
  autoPlay,
  togglePlay,
  resetWorld,
  nextGeneration,
  saveSnapshot,
  world,
}) => {
  return (
    <Stack m={4} spacing={4} direction="row" align="center">
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
      <IconButton
        onClick={() => saveSnapshot(world.dataURL)}
        aria-label="Save Snapshot"
        icon={<MdSave size={30} />}
        colorScheme="teal"
        size="md"
        isDisabled={autoPlay}
      ></IconButton>
    </Stack>
  );
};

export default PlaybackControl;
