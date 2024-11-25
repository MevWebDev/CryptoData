import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useCurrency } from "../contexts/CurrencyContext";

export interface CoinProps {
  price: number;
  id: string;
  image: string;
  change: number;
  name: string;
  mcap: number;
  symbol: string;
  index?: number;
}

export default function App() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const { currency, setCurrency } = useCurrency();

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let currency;
    switch (event.target.value) {
      case "usd":
        currency = { name: "usd", symbol: "$" };
        break;
      case "eur":
        currency = { name: "eur", symbol: "€" };
        break;
      case "gbp":
        currency = { name: "gbp", symbol: "£" };
        break;
      case "pln":
        currency = { name: "pln", symbol: "zł" };
        break;
      default:
        currency = { name: "usd", symbol: "$" };
    }
    setCurrency(currency);
  };

  function formatCoinsData(
    data: Array<{
      id: string;
      name: string;
      symbol: string;
      current_price: number;
      market_cap: number;
      price_change_percentage_24h: number;
      image: string;
    }>
  ): CoinProps[] {
    return data.map((entry) => ({
      id: entry.id,
      name: entry.name,
      symbol: entry.symbol,
      price: entry.current_price,
      mcap: entry.market_cap,
      change: entry.price_change_percentage_24h,
      image: entry.image,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": `${apiKey}`,
            },
          }
        );
        const data = await response.json();

        const formattedData = formatCoinsData(data);

        setCoins(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currency, apiKey]);

  const contextValue = { coins, currency, setCoins };

  return (
    <div className="font-satoshi-regular bg-[#06101b] text-white ">
      <Navbar handleCurrencyChange={handleCurrencyChange} />
      <main>{coins && <Outlet context={contextValue} />} </main>
    </div>
  );
}
