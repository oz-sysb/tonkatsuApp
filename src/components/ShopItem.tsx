import { Data } from '../App';

type Props = {
  shop: Data;
};
const ShopItem = ({ shop }: Props) => {
  return (
    <>
      <div>{shop.name}</div>
      <img src={shop.photo} />
      <div>{shop.rating}</div>
    </>
  );
};
export default ShopItem;
