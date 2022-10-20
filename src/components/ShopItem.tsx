import { Data, Location } from '../App';

type Props = {
  shop: Data;
  currentPosition?: Location;
};
const ShopItem = ({ shop, currentPosition }: Props) => {
  return (
    <>
      <div>{shop.name}</div>
      <img src={shop.photo} alt={shop.name} />
      <div>{shop.rating}</div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${currentPosition?.lat}%2c${currentPosition?.lng}&destination=${shop.lat}%2c${shop.lng}&travelmode=walking`}
      >
        MAPを開く
      </a>
    </>
  );
};
export default ShopItem;
