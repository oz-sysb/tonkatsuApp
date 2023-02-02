import { Dispatch, SetStateAction } from 'react';
import { Shop } from '../App';

export type Props = {
  shop: Shop;
  favoriteShops?: Shop[];
  setFavoriteShops?: Dispatch<SetStateAction<Shop[]>>;
};

// 1. 渡ってきたデータをもとに既に登録されているかどうかの判定
// 2. 判定結果によって状態を定義useReducer
// 3. 状態によってUIの変更
// 4. お気に入り削除

const FavoriteButton = ({ shop, favoriteShops, setFavoriteShops }: Props) => {
  const setItemLocalStorage = () => {
    const getItem = localStorage.getItem('favoriteShops');
    if (!getItem) {
      const favoriteShops: Shop[] = [shop];
      localStorage.setItem('favoriteShops', JSON.stringify(favoriteShops));
      return;
    }
    const favoriteShops: Shop[] = JSON.parse(getItem);
    favoriteShops.push(shop);
    localStorage.setItem('favoriteShops', JSON.stringify(favoriteShops));
  };

  const isFavoriteShop = () => {
    const isExist = favoriteShops?.some((i) => {
      return i.location === shop.location && i.name === shop.name;
    });
  };

  return <div>お気に入りボタンaaa</div>;
};
export default FavoriteButton;
