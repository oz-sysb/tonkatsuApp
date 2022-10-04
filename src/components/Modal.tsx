import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
} from '@chakra-ui/react';
import { Data, Location } from '../App';

type Prop = {
  isOpen: boolean;
  onClose: () => void;
  data?: Data;
  currentPosition?: Location;
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
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${props.currentPosition?.lat}%2c${props.currentPosition?.lng}&destination=${props.data.lat}%2c${props.data.lng}&travelmode=walking`}
                  >
                    MAPを開く
                  </a>
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
