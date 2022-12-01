import { ComponentMeta } from '@storybook/react';
import ShopModal, { Props } from '../../components/ShopModal';

export default {
  title: 'Components/ShopModal',
  component: ShopModal,
} as ComponentMeta<typeof ShopModal>;

export const StoryShopModal = (args: Props) => <ShopModal {...args} />;

StoryShopModal.args = {
  isOpen: true,
  onClose: () => {},
  shop: {
    location: { lat: 123, lng: 456 },
    name: 'name',
    photo: 'https://placehold.jp/450x150.png',
    rating: 3,
  },
  currentLocation: {
    lat: 123,
    lng: 456,
  },
};
