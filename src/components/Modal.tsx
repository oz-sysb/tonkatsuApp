import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
} from '@chakra-ui/react';
import { Data } from '../App';

type Prop = {
  isOpen: boolean;
  onClose: () => void;
  data?: Data;
};

const MyModal = (props: Prop) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {props.data && (
              <div>
                {props.data.name}
                <Box boxSize="sm">
                  <Image src={props.data.photo} />
                </Box>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
