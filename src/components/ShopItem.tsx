import { Badge, Box, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Shop, Location } from '../App';
import { Dispatch, SetStateAction, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import FavoriteShops from './FavoriteShops';

export type Props = {
  shop: Shop;
  currentLocation: Location;
  favoriteShops: Shop[];
  setFavoriteShops: Dispatch<SetStateAction<Shop[]>>;
};
const ShopItem = ({
  shop,
  currentLocation,
  favoriteShops,
  setFavoriteShops,
}: Props) => {
  return (
    <Box
      mb={15}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={shop.photo} alt={shop.name} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat}%2c${currentLocation.lng}&destination=${shop.location.lat}%2c${shop.location.lng}&travelmode=walking`}
            >
              MAPを開く
            </a>
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {shop.name}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < shop.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {shop.rating}
          </Box>
        </Box>
        {/* <button onClick={setItemLocalStorage}>お気に入りボタン</button> */}
        <FavoriteButton
          shop={shop}
          favoriteShops={favoriteShops}
          setFavoriteShops={setFavoriteShops}
        />
      </Box>
    </Box>
  );
};
export default ShopItem;
