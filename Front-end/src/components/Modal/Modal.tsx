// src/components/Modal.tsx
import React, { ReactNode, MouseEvent } from "react";
import tw from "tailwind-styled-components";
import MyModalContent from "./ModalFormContent";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

const ModalOverlay = tw.div`
  fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-y-scroll
`;

const ModalContainer = tw.div`
  bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 max-h-[90vh] overflow-y-scroll
`;

const ModalHeader = tw.div`
  flex justify-between items-center mb-4
`;

const ModalTitle = tw.h2`
  text-xl font-semibold
`;

const CloseButton = tw.button`
  text-gray-700 hover:text-gray-900
`;

const ModalBody = tw.div`
  mb-4 overflow-y-auto
`;

const ModalFooter = tw.div`
  flex justify-end
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <MyModalContent />
        </ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
