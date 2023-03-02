import { useEffect, Dispatch, SetStateAction } from 'react';
import { Shop, Location } from '../App';
import ShopList from './ShopList';

type Props = {
  currentLocation: Location;
  isFavoriteClicked: boolean;
  favoriteShops: Shop[];
  setFavoriteShops: Dispatch<SetStateAction<Shop[]>>;
};

const FavoriteShops = ({
  currentLocation,
  isFavoriteClicked,
  favoriteShops,
  setFavoriteShops,
}: Props) => {
  useEffect(() => {
    const fetchedFavoriteShops: Shop[] = JSON.parse(
      localStorage.getItem('favoriteShops') ?? '[]'
    );
    setFavoriteShops(fetchedFavoriteShops);
    console.log('FavoriteShopsタイミング');
    // eslint-disable-next-line
  }, [isFavoriteClicked]);
  return (
    <ShopList
      shops={favoriteShops}
      currentLocation={currentLocation}
      favoriteShops={favoriteShops}
      setFavoriteShops={setFavoriteShops}
    />
  );
};
export default FavoriteShops;
