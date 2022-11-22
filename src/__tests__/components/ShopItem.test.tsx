import ShopItem from '../../components/ShopItem';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Shop, Location } from '../../App';

const shop: Shop = {
  location: { lat: 1, lng: 2 },
  name: 'testname',
  photo: 'testphoto',
  rating: 5,
};

const currentLocation: Location = {
  lat: 123,
  lng: 123,
};

it('ShopItem nameのテスト', () => {
  render(<ShopItem shop={shop} currentLocation={currentLocation} />);
  const elemet = screen.getByText(/testname/i);
  expect(elemet).toBeInTheDocument();
});

it('ShopItem ratingのテスト', () => {
  render(<ShopItem shop={shop} currentLocation={currentLocation} />);
  const elemet = screen.getByText(/5/i);
  expect(elemet).toBeInTheDocument();
});
