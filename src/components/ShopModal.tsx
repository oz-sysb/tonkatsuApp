import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop;
  currentLocation: Location;
  favoriteShops: Shop[];
  setFavoriteShops: Dispatch<SetStateAction<Shop[]>>;
};

const ShopModal = ({
  isOpen,
  onClose,
  shop,
  currentLocation,
  favoriteShops,
  setFavoriteShops,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={0}>
        <ModalBody pt={25}>
          <ShopItem
            shop={shop}
            currentLocation={currentLocation}
            favoriteShops={favoriteShops}
            setFavoriteShops={setFavoriteShops}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ShopModal;
