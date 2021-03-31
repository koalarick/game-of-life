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

const PhotoGallery = ({ galleryPhotos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("top");

  const photos = galleryPhotos.map((photo) => {
    return (
      <Box>
        <PhotoModal photo={photo} />
      </Box>
    );
  });

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
