import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const PhotoModal = ({ photo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image onClick={onOpen} src={photo} borderRadius="full" boxSize="100px" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={photo} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoModal;
