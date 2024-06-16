import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className=" text-center w-5/12 m-auto">
      <h1 className=" text-2xl font-bold m-4 p-5">Cart</h1>
      <button
        className=" bg-pink-200  p-2 rounded-lg hover:bg-pink-300"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && (
        <h1 className="text-2xl font-bold m-4 p-5">Add Items to your cart</h1>
      )}
      <MenuCard menuItems={cartItems} />
    </div>
  );
};

export default Cart;
