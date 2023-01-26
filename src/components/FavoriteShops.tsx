import { useState, useEffect } from 'react';
import { Shop, Location } from '../App';
import ShopList from './ShopList';

type Props = {
  currentLocation: Location;
  isFavoriteClicked: boolean;
};

const FavoriteShops = ({ currentLocation, isFavoriteClicked }: Props) => {
  const [favoriteShops, setFavoriteShops] = useState<Shop[]>([]);
  useEffect(() => {
    const fetchedFavoriteShops: Shop[] = JSON.parse(
      localStorage.getItem('favoriteShops') ?? '[]'
    );
    setFavoriteShops(fetchedFavoriteShops);
    console.log('FavoriteShopsタイミング');
  }, [isFavoriteClicked]);
  return <ShopList shops={favoriteShops} currentLocation={currentLocation} />;
};
export default FavoriteShops;
