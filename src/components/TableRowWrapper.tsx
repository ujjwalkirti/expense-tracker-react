import { Button, Heading, Td, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef } from "react";

type props = {
  name?: string;
  description?: string;
};

function TableRowWrapper({ name, description }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  return (
    <Td>
      {description ? (
        <Button onClick={onOpen} colorScheme="teal" size="sm">
          more details
        </Button>
      ) : null}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as={"h3"} size={"lg"}>
              {name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{description}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
  );
}

export default TableRowWrapper;
