import { Shop, Location } from '../App';
import ShopItem from './ShopItem';

type Props = {
  shops: Shop[];
  currentPosition?: Location;
};

const ShopList = ({ shops, currentPosition }: Props) => {
  return (
    <>
      {shops.map((item, i) => (
        <ShopItem shop={item} currentPosition={currentPosition} key={i} />
      ))}
    </>
  );
};
export default ShopList;
