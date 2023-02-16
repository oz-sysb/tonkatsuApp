import { Dispatch, SetStateAction, useState } from 'react';
import { Shop } from '../App';

export type Props = {
  shop: Shop;
  favoriteShops: Shop[];
  setFavoriteShops: Dispatch<SetStateAction<Shop[]>>;
};

const FavoriteButton = ({ shop, favoriteShops, setFavoriteShops }: Props) => {
  const [isFavoriteShop, setIsFavoriteShop] = useState<boolean>(
    favoriteShops.some((i) => {
      return (
        i.location.lat === shop.location.lat &&
        i.location.lng === shop.location.lng &&
        i.name === shop.name
      );
    })
  );

  return (
    <div>
      {favoriteShops.map((s) => {
        return (
          <div key={s.name}>
            {s.location.lng} {s.location.lat} {s.name}
          </div>
        );
      })}
      {isFavoriteShop ? (
        <div
          onClick={() => {
            // App.tsxのuseStateであるfavoriteShopsから削除
            const favoriteShopsFilter = favoriteShops.filter((i) => {
              return !(
                i.location.lat === shop.location.lat &&
                i.location.lng === shop.location.lng
              );
            });
            setFavoriteShops(favoriteShopsFilter);
            // FavoriteButtonのuseStateであるisFavoriteShopをtrueにする
            setIsFavoriteShop(!isFavoriteShop);
          }}
        >
          お気に入り削除 {favoriteShops.length}
        </div>
      ) : (
        <div
          onClick={() => {
            // App.tsxのuseStateであるfavoriteShopsに追加
            setFavoriteShops([...favoriteShops, shop]);
            // FavoriteButtonのuseStateであるisFavoriteShopをfalseにする
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
