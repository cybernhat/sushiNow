
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../components/HomePage/HomePage";
import TablesPage from "../components/TablesPage/TablesPage";
import KitchenPage from "../components/KitchenPage/KitchenPage";
import OrdersPage from "../components/Orders/OrdersPage";
import OneOrder from "../components/Orders/OneOrder"; // if you use it later

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/tables",
        element: <TablesPage />,
      },
      {
        path: "/kitchen",
        element: <KitchenPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OneOrder />,
      },
    ],
  },
]);