import React, { useRef, useEffect, useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import {
  IconButton,
  Button,
  Select,
  Text,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const PhotoGallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("top");

  return (
    <>
      <IconButton
        colorScheme="white"
        color="teal"
        onClick={onOpen}
        icon={<RiGalleryFill size={30} />}
      ></IconButton>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              User World Snapshots
            </DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default PhotoGallery;
