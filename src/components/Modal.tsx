import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type Prop = {
  isOpen: boolean;
  onClose: () => void;
};

const MyModal = (props: Prop) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div>モーダルだよ</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
