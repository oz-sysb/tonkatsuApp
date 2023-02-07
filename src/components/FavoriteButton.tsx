import { Dispatch, SetStateAction, useState } from 'react';
import { Shop } from '../App';

export type Props = {
  shop: Shop;
  favoriteShops: Shop[];
  setFavoriteShops: Dispatch<SetStateAction<Shop[]>>;
};

// 1. 渡ってきたデータをもとに既に登録されているかどうかの判定
// - favoriteShopsをlocalstoragenに反映
// - 他のページにも反映
// 2. 判定結果によって状態を定義useReducer
// 3. 状態によってUIの変更
// 4. お気に入り削除も同様に行う

const FavoriteButton = ({ shop, favoriteShops, setFavoriteShops }: Props) => {
  const [isFavoriteShop, setIsFavoriteShop] = useState<boolean>(
    favoriteShops?.some((i) => {
      return i.location === shop.location && i.name === shop.name;
    })
  );

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

  return (
    <div>
      {isFavoriteShop ? (
        <div>お気に入り削除 {favoriteShops.length}</div>
      ) : (
        <div
          onClick={() => {
            setFavoriteShops([...favoriteShops, shop]);
            setIsFavoriteShop(!isFavoriteShop);
          }}
        >
          お気に入り追加 {favoriteShops.length}
        </div>
      )}
    </div>
  );
};
export default FavoriteButton;
