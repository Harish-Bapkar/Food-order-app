import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnLoginLogut, setBtnLoginLogout] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg m-2">
      <div className="logo">
        <img className="w-28" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className=" p-1">OnlineState {onlineStatus ? "🟢" : "🔴"}</li>
          <li className=" p-1 m-1   bg-gray-200 rounded-md hover:bg-slate-300">
            <Link to="/">Home</Link>
          </li>
          <li className=" p-1 m-1  bg-gray-200 rounded-md hover:bg-slate-300">
            <Link to="/about">About Us</Link>
          </li>
          <li className=" p-1 m-1  bg-gray-200 rounded-md hover:bg-slate-300">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className=" p-1 m-1  bg-gray-200 rounded-md hover:bg-slate-300">
            <Link to="/gorcery">Gorcery</Link>
          </li>
          <li
            className={
              btnLoginLogut === "Login"
                ? ""
                : " p-1 m-1  bg-gray-200 rounded-md hover:bg-slate-300 text-red-600 font-semibold"
            }
          >
            <Link to="/cart">
              {" "}
              {btnLoginLogut === "Logout" && "Cart 🛒" + cartItems.length}
            </Link>
          </li>
          <li className=" p-1 m-1  bg-gray-200 rounded-md hover:bg-slate-300">
            <button
              onClick={() => {
                btnLoginLogut === "Login"
                  ? setBtnLoginLogout("Logout")
                  : setBtnLoginLogout("Login");
              }}
            >
              {btnLoginLogut}
            </button>
          </li>
          <li className=" p-1 font-semibold">
            {btnLoginLogut === "Logout" && "User:" + loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
