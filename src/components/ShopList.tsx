import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

type Props = {
  shops: Shop[];
  currentLocation: Location;
};

const ShopList = ({ shops, currentLocation }: Props) => {
  return (
    <>
      {shops.map((item, i) => (
        <ShopItem shop={item} currentLocation={currentLocation} key={i} />
      ))}
    </>
  );
};
export default ShopList;
