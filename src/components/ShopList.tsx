import { Button } from '@chakra-ui/react';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

export type Props = {
  shops: Shop[];
  currentLocation: Location;
  setRadius: Dispatch<SetStateAction<number>>;
};

const R = Math.PI / 180;

const distanceToShop = (
  { lat: lat1, lng: lng1 }: Location,
  { location: { lat: lat2, lng: lng2 } }: Shop
) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
};

const ShopList = ({ shops, currentLocation, setRadius }: Props) => {
  const [sortedShops, setSortedShops] = useState<Shop[]>(shops);

  useEffect(() => {
    setSortedShops(shops);
  }, [shops]);

  const sortByRating = () => {
    var clonedShops = Array.from(sortedShops);
    clonedShops.sort((a, b) => b.rating - a.rating);
    setSortedShops(clonedShops);
  };

  const sortByDistance = () => {
    let clonedShops = Array.from(sortedShops);
    clonedShops.sort(
      (a, b) =>
        distanceToShop(currentLocation, a) - distanceToShop(currentLocation, b)
    );
    setSortedShops(clonedShops);
  };

  return (
    <>
      <Button
        colorScheme="teal"
        variant="outline"
        mb={15}
        onClick={sortByRating}
      >
        評価順
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        mb={15}
        ml={15}
        onClick={sortByDistance}
      >
        距離順
      </Button>
      <Button
        onClick={() => {
          setRadius(5000);
        }}
      >
        5km未満
      </Button>
      {sortedShops.map((item, i) => (
        <ShopItem shop={item} currentLocation={currentLocation} key={i} />
      ))}
    </>
  );
};
export default ShopList;
