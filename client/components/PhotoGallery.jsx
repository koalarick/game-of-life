import React from "react";
import { RiGalleryFill } from "react-icons/ri";
import { IconButton, useDisclosure, SimpleGrid, Box } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import PhotoModal from "./PhotoModal";
const axios = require("axios").default;

const PhotoGallery = ({ galleryPhotos, setGalleryPhotos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("top");

  const photos = galleryPhotos.map((item) => {
    return (
      <Box key={item.id}>
        <PhotoModal photo={item.photo} />
      </Box>
    );
  });

  const galleryOpen = () => {
    onOpen();
    // need to getPhotos and store them into the galleryPhotos state
    let request = {
      method: "get",
      url: "http://localhost:3000/photos",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(request).then((res) => {
      if (res.status === 200) {
        setGalleryPhotos(res.data.photos);
      }
    });
    return;
  };

  return (
    <>
      <IconButton
        colorScheme="white"
        color="teal"
        onClick={galleryOpen}
        icon={<RiGalleryFill size={30} />}
      ></IconButton>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px" color="teal" size="md">
              Community Snapshots
            </DrawerHeader>
            <DrawerBody>
              <SimpleGrid m={4} minChildWidth="100px" spacing="20px">
                {photos}
              </SimpleGrid>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default PhotoGallery;
