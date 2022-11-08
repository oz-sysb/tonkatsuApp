import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  shop?: Shop;
  currentLocation?: Location;
};

const MyModal = ({ isOpen, onClose, shop, currentLocation }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalBody pt={25}>
            {shop && <ShopItem shop={shop} currentLocation={currentLocation} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
