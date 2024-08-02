import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  headerChildren: ReactNode;
  children: ReactNode;
  footerChildren?: ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  closeButton?: boolean;
};

const ModalForm: FC<ModalPropsType> = ({
  isOpen,
  onClose,
  headerChildren,
  children,
  footerChildren,
  headerClassName,
  bodyClassName,
  footerClassName,
  contentClassName,
  closeOnOverlayClick,
  closeOnEsc,
  closeButton,
}) => {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
    >
      <ModalOverlay />
      <ModalContent
        className={styles.modal_content + " " + (contentClassName || "")}
      >
        {closeButton && <ModalCloseButton />}
        <ModalHeader
          className={styles.modal_header + " " + (headerClassName || "")}
        >
          {headerChildren}
        </ModalHeader>
        <ModalBody className={styles.modal_body + " " + (bodyClassName || "")}>
          {children}
        </ModalBody>
        <ModalFooter
          className={styles.modal_footer + " " + (footerClassName || "")}
        >
          {footerChildren}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
