import { useParams } from "react-router";
import HistoricalChart from "./HistoricalChart";
import { useEffect, useState } from "react";
import CoinDetailItem from "./CoinDetailItem";
import { useCurrency } from "../contexts/CurrencyContext";
import Loading from "./Loading";

interface CoinDataProps {
  market_cap_rank: number;
  market_data: {
    current_price: { [key: string]: number };
    low_24h: { [key: string]: number };
    high_24h: { [key: string]: number };
    market_cap: { [key: string]: number };
    ath: { [key: string]: number };
  };
  name: string;
  symbol: string;
}

interface CoinDataFormattedProps {
  rank: number;
  price: number;
  name: string;
  symbol: string;
  low: number;
  high: number;
  marketCap: number;
  ath: number;
}

export interface ChartData {
  labels: string[];
  data: number[];
  days: number;
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const { currency } = useCurrency();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [coinData, setCoinData] = useState<CoinDataFormattedProps | null>(null);
  const [days, setDays] = useState<number>(30);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchHistoricalData = async (
    coinId: string,
    currency: string,
    days: number
  ) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
      );
      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    const loadChartData = async () => {
      const prices = await fetchHistoricalData(coinId!, currency.name, days);
      if (prices) {
        const formattedData = formatChartData(prices);
        setChartData(formattedData);
      }
    };
    const formatChartData = (prices: Array<[number, number]>) => {
      const labels = prices.map(([timestamp]) =>
        new Date(timestamp).toLocaleDateString()
      );

      const data = prices.map(([, price]) => price);

      return { labels, data, days };
    };

    loadChartData();
  }, [coinId, currency, days]);

  useEffect(() => {
    function formatData(data: CoinDataProps): CoinDataFormattedProps {
      return {
        rank: data?.market_cap_rank,
        price: data?.market_data.current_price[currency.name],
        name: data?.name,
        symbol: data?.symbol,
        low: data?.market_data.low_24h[currency.name],
        high: data?.market_data.high_24h[currency.name],
        marketCap: data?.market_data.market_cap[currency.name],
        ath: data?.market_data.ath[currency.name],
      };
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": `${apiKey}`,
            },
          }
        );
        const data = await response.json();
        const formattedData = formatData(data);
        setCoinData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currency, coinId, days, apiKey]);

  if (!coinData || !chartData) return <Loading />;

  function formatNumber(number: number) {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
  }

  return (
    <div className="flex flex-col max-h-dvh ">
      <h1 className="text-center text-[4rem] font-satoshi-bold my-4">
        {coinData.name}
        <span className="text-[3rem] text-[#4c82fb]"> ({coinData.symbol})</span>
      </h1>

      <div className="flex flex-col  gap-2  w-11/12 md:w-1/3 mx-auto ">
        <CoinDetailItem
          text={"Rank"}
          value={coinData.rank}
          style={"rounded-t-lg"}
        />
        <CoinDetailItem
          text={"Current Price"}
          value={`${formatNumber(coinData.price)} ${currency.symbol}`}
        />
        <CoinDetailItem
          text={"Market Cap"}
          value={`${formatNumber(coinData.marketCap)} ${currency.symbol}`}
        />
        <CoinDetailItem
          text={"24 Hour high"}
          value={`${formatNumber(coinData.high)} ${currency.symbol}`}
        />
        <CoinDetailItem
          text={"24 Hour Low"}
          value={`${formatNumber(coinData.low)} ${currency.symbol}`}
        />
        <CoinDetailItem
          text={"All Time High"}
          value={`${formatNumber(coinData.ath)} ${currency.symbol}`}
          style={"rounded-b-lg"}
        />
      </div>
      <HistoricalChart
        coinId={coinId!}
        currency={currency.name}
        chartData={chartData}
        setDays={setDays}
      />
    </div>
  );
}

export default Coin;
