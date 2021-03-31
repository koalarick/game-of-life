import React, { useRef, useEffect, useState } from "react";
import { Button, Select, Text, useDisclosure, Stack } from "@chakra-ui/react";
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
  rules,
  setRules,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let tempRandomChance = randomChance;
  let tempRules = { ...rules };

  const onSave = () => {
    let changed = false;
    if (tempRandomChance !== randomChance) {
      changed = true;
      setRandomChance(tempRandomChance);
    }
    if (
      tempRules.neighborMin !== rules.neighborMin ||
      tempRules.neighborMax !== rules.neighborMax
    ) {
      changed = true;
      setRules(tempRules);
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
              <Text fontSize="sm" as="u">
                Seed
              </Text>
              <Select
                onChange={(e) => (tempRandomChance = e.target.value)}
                size="xs"
                variant="outline"
                placeholder="Select seed"
                mb={4}
              >
                <option value={0.5}>50% Random</option>
                <option value={0.1}>10% Random</option>
                <option value={0.02}>2% Random</option>
                <option value={0.01}>1% Random</option>
                <option value={0.0025}>.25% Random</option>
              </Select>
              <Stack spacing={3}>
                <Text fontSize="sm" mt={10} as="u">
                  Survival Rules
                </Text>

                <Text fontSize="xs" mt={2} as="i">
                  Minimum Neighbors
                </Text>
                <NumberInput
                  defaultValue={rules.neighborMin}
                  min={1}
                  max={8}
                  onChange={(value) => (tempRules.neighborMin = value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text fontSize="xs" as="i">
                  Maximum Neighbors
                </Text>
                <NumberInput
                  defaultValue={rules.neighborMax}
                  min={1}
                  max={8}
                  onChange={(value) => (tempRules.neighborMax = value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
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
