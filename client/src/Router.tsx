import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HotelsList from "./pages/HotelList/HotelsList";
import Root from "./pages/Root";
import HotelDetails from "./pages/HotelDetails/HotelDetails";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Root,
      children: [
        {
          path: "/",
          Component: HotelsList,
        },
        {
          path: "/hotel/:id",
          Component: HotelDetails,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;