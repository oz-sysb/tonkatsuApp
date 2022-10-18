import { Data } from '../App';
import ShopItem from './ShopItem';

type Props = {
  shops: Data[];
};

const ShopList = ({ shops }: Props) => {
  return (
    <>
      {shops.map((item, i) => (
        <ShopItem shop={item} key={i} />
      ))}
    </>
  );
};
export default ShopList;
