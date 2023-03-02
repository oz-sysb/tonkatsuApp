import { Dispatch, SetStateAction, useState } from 'react';
import { Shop } from '../App';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';

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
      {isFavoriteShop ? (
        <IconButton
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
          aria-label="お気に入り削除ボタン"
          variant="outline"
          colorScheme="red"
          size="sm"
          isRound
          icon={<AiFillHeart />}
        />
      ) : (
        <IconButton
          onClick={() => {
            // App.tsxのuseStateであるfavoriteShopsに追加
            setFavoriteShops([...favoriteShops, shop]);
            // FavoriteButtonのuseStateであるisFavoriteShopをfalseにする
            setIsFavoriteShop(!isFavoriteShop);
          }}
          aria-label="お気に入り追加ボタン"
          variant="outline"
          colorScheme="red"
          size="sm"
          isRound
          icon={<AiOutlineHeart />}
        />
      )}
    </div>
  );
};
export default FavoriteButton;
