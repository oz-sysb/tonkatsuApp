import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Shop } from '../App';
import ShopItem, { Props } from './ShopItem';

export default {
  title: 'Components/ShopItem',
  component: ShopItem,
} as ComponentMeta<typeof ShopItem>;

export const StoryShopItem = (args: Props) => <ShopItem {...args} />;

StoryShopItem.args = {
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
