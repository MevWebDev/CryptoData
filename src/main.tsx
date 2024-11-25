import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Homepage from "./components/Homepage.tsx";
import CoinDetails from "./components/CoinDetails.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/coin/:coinId",
        element: <CoinDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics />
    <CurrencyProvider>
      <RouterProvider router={router} />
    </CurrencyProvider>
  </StrictMode>
);
