import { useEffect, useState } from "react";
import { RESTURAENT_MENU_URL } from "./constants";
const useResturantMenu = (resid) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(RESTURAENT_MENU_URL + resid);
    const json = await data.json();
    setResInfo(json.data);
  };

  return resInfo;
};

export default useResturantMenu;
