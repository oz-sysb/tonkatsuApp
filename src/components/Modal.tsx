import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { Data, Location } from '../App';
import ShopItem from './ShopItem';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data?: Data;
  currentPosition?: Location;
};

const MyModal = (props: Props) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalBody pt={25}>
            {props.data && (
              <ShopItem
                shop={props.data}
                currentPosition={props.currentPosition}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
