import ResturentCard, { withPromoted } from "./ResturentCard";
import ShimerUI from "./ShimerUI";
import { RESTURAENT_LIST_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Boday = () => {
  const [listOfResturent, setListOfResturent] = useState([]);
  const [isError, setIsError] = useState(false);

  const [searchText, setSearchText] = useState("");

  const onlineStatus = useOnlineStatus();

  const ResturentCardPromoted = withPromoted(ResturentCard);

  const { loggedInUser, setUserName } = useContext(UserContext);
  let intailDataRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RESTURAENT_LIST_URL);

      const json = await data.json();
      setListOfResturent(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      intailDataRef.current =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    } catch (err) {
      setIsError(true);
    }
  };

  if (isError) {
    return <h1>Something Went wrong</h1>;
  }
  if (listOfResturent.length === 0 || typeof listOfResturent === "undefined") {
    return <h1>Resturent List is Empty</h1>;
  }

  if (onlineStatus === false) {
    return <h1>Your offline please check your internet connection </h1>;
  }

  return (
    <div className="body-container">
      <div className="flex m-3">
        <div className="search-bar m-2">
          <input
            type="text"
            className=" border divide-solid to-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className=" mx-1 px-1  bg-gray-200 rounded-md hover:bg-slate-300"
            onClick={() => {
              console.log(searchText);
              const searchResturent = listOfResturent.filter((res) => {
                return res.info.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase());
              });
              setListOfResturent(searchResturent);
            }}
          >
            🔎
          </button>
        </div>
        <button
          className=" hover:bg-slate-300"
          onClick={() => {
            const topFilterdResturent = listOfResturent.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListOfResturent(topFilterdResturent);
          }}
        >
          Top Rated Resturents
        </button>

        <button
          className=" mx-1"
          onClick={() => {
            setListOfResturent(intailDataRef.current);
          }}
        >
          ❌Filters
        </button>
        {/* User:
        <input
          type="text"
          className=" border divide-solid to-black m-2 p-2"
          value={loggedInUser}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        /> */}
      </div>

      <div className=" flex flex-wrap justify-center">
        {listOfResturent.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
            {res.info.veg ? (
              <ResturentCardPromoted resdata={res} />
            ) : (
              <ResturentCard resdata={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Boday;
