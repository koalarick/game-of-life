import React, { useRef, useEffect, useState } from "react";
import { Button, Select, Text, useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const SettingsMenu = ({
  randomChance,
  setRandomChance,
  setHasChanges,
  generation,
  setGeneration,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let tempRandomChance = randomChance;

  const onSave = () => {
    let changed = false;
    if (tempRandomChance !== randomChance) {
      changed = true;
      setRandomChance(tempRandomChance);
    }

    if (changed) {
      if (!generation) {
        setHasChanges(true);
      } else {
        setGeneration(0);
      }
    }

    onClose();
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Settings
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>

            <DrawerBody>
              <Text fontSize="sm">Seed</Text>
              <Select
                onChange={(e) => (tempRandomChance = e.target.value)}
                placeholder="Select seed"
              >
                <option value={0.5}>50% Random</option>
                <option value={0.1}>10% Random</option>
                <option value={0.02}>2% Random</option>
                <option value={0.01}>1% Random</option>
                <option value={0.0025}>.25% Random</option>
              </Select>

              <Text fontSize="sm" align="left">
                Survival Rules
              </Text>

              <Text fontSize="xs">Minimum Neighbors</Text>
              <NumberInput defaultValue={2} min={1} max={8}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Text fontSize="xs">Maximum Neighbors</Text>
              <NumberInput defaultValue={3} min={1} max={8}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onSave}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SettingsMenu;
