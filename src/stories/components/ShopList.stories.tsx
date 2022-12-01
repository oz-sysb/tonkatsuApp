import { ComponentMeta } from '@storybook/react';
import ShopList, { Props } from '../../components/ShopList';

export default {
  title: 'Components/ShopList',
  component: ShopList,
} as ComponentMeta<typeof ShopList>;

export const StoryShopList = (args: Props) => <ShopList {...args} />;

StoryShopList.args = {
  shops: [
    {
      location: { lat: 123, lng: 456 },
      name: 'name1',
      photo: 'https://placehold.jp/450x150.png',
      rating: 1,
    },
    {
      location: { lat: 123, lng: 456 },
      name: 'name2',
      photo: 'https://placehold.jp/450x150.png',
      rating: 2,
    },
    {
      location: { lat: 123, lng: 456 },
      name: 'name3',
      photo: 'https://placehold.jp/450x150.png',
      rating: 3,
    },
  ],
  currentLocation: {
    lat: 123,
    lng: 456,
  },
};
