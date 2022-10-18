import { Data } from '../App';

type Props = {
  shop: Data;
};
const ShopItem = ({ shop }: Props) => {
  return (
    <>
      <div>{shop.name}</div>
      <div>{shop.photo}</div>
    </>
  );
};
export default ShopItem;
