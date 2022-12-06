import { useState, useEffect } from 'react';
import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

export type Props = {
  shops: Shop[];
  currentLocation: Location;
};

const ShopList = ({ shops, currentLocation }: Props) => {
  const [sortedShops, setSortedShops] = useState<Shop[]>(shops);
  useEffect(() => {
    setSortedShops(shops);
  }, [shops]);
  const sortByRating = () => {
    var clonedShops = Array.from(sortedShops);
    clonedShops.sort((a, b) => b.rating - a.rating);
    setSortedShops(clonedShops);
  };

  return (
    <>
      <button onClick={sortByRating}>評価順</button>
      {sortedShops.map((item, i) => (
        <ShopItem shop={item} currentLocation={currentLocation} key={i} />
      ))}
    </>
  );
};
export default ShopList;
