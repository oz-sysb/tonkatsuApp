import { Badge, Box, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Data, Location } from '../App';

type Props = {
  shop: Data;
  currentPosition?: Location;
};
const ShopItem = ({ shop, currentPosition }: Props) => {
  return (
    <>
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
                href={`https://www.google.com/maps/dir/?api=1&origin=${currentPosition?.lat}%2c${currentPosition?.lng}&destination=${shop.lat}%2c${shop.lng}&travelmode=walking`}
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
              {/* {property.reviewCount} reviews */}
              {shop.rating}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ShopItem;
