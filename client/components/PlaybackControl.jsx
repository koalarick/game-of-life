import React from "react";
import { IconButton, Stack, useToast } from "@chakra-ui/react";
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdRefresh,
  MdSave,
} from "react-icons/md";
import { AiFillStepForward } from "react-icons/ai";
const axios = require("axios").default;

const savePhoto = (photo) => {
  let request = {
    method: "post",
    url: "http://localhost:3000/photos",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      photo: photo,
    },
  };
  return axios(request);
};

const PlaybackControl = ({
  autoPlay,
  togglePlay,
  resetWorld,
  nextGeneration,
  saveSnapshot,
  world,
}) => {
  const toast = useToast();

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
        onClick={() => {
          savePhoto(world.dataURL).then((res) => {
            if (res.status === 200) {
              toast({
                title: "Snapshot saved!",
                description: "You can check it out in the Gallery",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Oops!",
                description: "Something went wrong please try again later",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          });
        }}
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
