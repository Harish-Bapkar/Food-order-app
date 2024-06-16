import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Boday from "./components/Body";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantInfo from "./components/RestaurantInfo";
import Cart from "./components/Cart";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react/cjs/react.production.min";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
const Gorcery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    //make API call and Authenticate user
    const data = {
      name: "Harish Bapkar",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />

          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Boday />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resid",
        element: <RestaurantInfo />,
      },
      {
        path: "/gorcery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Gorcery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
