
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import TablesPage from "../components/TablesPage";
import KitchenPage from "../components/KitchenPage";
import OrdersPage from "../components/OrdersPage";
import OneOrder from "../components/OneOrder";
import PasscodeScreen from "../components/EnterPasscode";
import BOHPage from "../components/BOHPage";
import FOHPage from "../components/FOHPage";
import MenuPage from "../components/MenuPage";

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
        path: "/BOH/orders/:orderId",
        element: <OneOrder />,
      },
      {
        path: "/passcode",
        element: <PasscodeScreen/>
      },
      {
        path: "/BOH",
        element: <BOHPage/>
      },
      {
        path: "/FOH",
        element: <FOHPage/>
      },
      {
        path: "/menu",
        element: <MenuPage/>
      }
    ],
  },
]);