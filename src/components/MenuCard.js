import { FOOD_CARD_IMG_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const MenuCard = ({ menuItems }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div>
      {menuItems.map((item) => {
        return (
          <div
            key={item.card.info.id}
            className=" flex justify-between m-2 p-2 border-b-2 border-gray-300 text-left"
          >
            <div className="  w-9/12 ">
              <span className=" font-semibold">{item.card.info.name}</span>
              <span className=" font-semibold">
                - ₹ {item.card.info.price / 100}
              </span>
              <p className=" text-xs"> {item.card.info.description}</p>
            </div>
            <div className=" m-4 w-3/12">
              <div className="absolute">
                <button
                  className="p-1 mx-16  rounded-lg bg-white text-green-600 shadow-lg"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              </div>
              <img
                className=" "
                src={FOOD_CARD_IMG_URL + item.card.info.imageId}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuCard;
