import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface EndgameDialogProps {
  isOpen: boolean;
  status: string;
  restart: () => Promise<void>;
  onClose: () => void;
}

const EndgameDialog: FC<EndgameDialogProps> = ({ isOpen, onClose, restart, status }) => {
  const navigate = useNavigate();

  const handleExit = async () => {
    await restart().then(() => navigate("/config"));
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent backgroundColor={"#232323"} color={"#dedede"}>
        <ModalHeader>Game Over</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{status}</ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>Restart</Button>
          <Button marginLeft={5} colorScheme="teal" onClick={handleExit}>
            Exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EndgameDialog;
