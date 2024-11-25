import { useOutletContext } from "react-router";
import { CoinProps } from "./App";
import CoinListItem from "./CoinListItem";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import Footer from "./Footer";

interface ContextType {
  coins: CoinProps[];
  currency: { name: string; symbol: string };
  setCoins: (coins: CoinProps[]) => void;
}

function Homepage() {
  const { coins, currency } = useOutletContext<ContextType>();
  const [input, setInput] = useState("");
  const [displayCoins, setDisplayCoins] = useState<CoinProps[]>(coins);

  useEffect(() => {
    setDisplayCoins(coins);
  }, [coins]);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoins(coins);
    }
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchedCoins = coins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayCoins(searchedCoins);
  }

  return (
    <div className="my-8">
      <h1 className="font-satoshi-bold text-[2rem] md:text-[4rem] text-center my-12 leading-none ">
        Largest <br />
        Crypto Marketplace
      </h1>
      <form
        onSubmit={handleSearch}
        className=" text-black w-10/12 md:w-1/4 flex justify-between  mx-auto p-2 bg-white rounded-lg"
      >
        <input
          onChange={handleInput}
          type="text"
          placeholder="Search a coin"
          required
          list="coinlist"
          className="pl-2 w-9/12 focus:border-0 focus:bg-transparent focus:outline-none bg-transparent"
        ></input>
        <datalist id="coinlist">
          {coins.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>

        <button
          className="bg-[#4c82fb] hover:bg-[#3573f8] font-satoshi-bold px-3 py-2 rounded-md text-white "
          type="submit"
        >
          Search
        </button>
      </form>
      {coins.length > 0 ? (
        <div className="flex flex-col  justify-center w-11/12 md:w-1/2 mx-auto gap-2 mt-12">
          <div className="coin-grid md:coin-grid bg-[#131a2a] rounded-t-xl">
            <p>#</p>
            <p>Coin</p>
            <p>Price</p>
            <p>24H Change</p>
            <p className="hidden md:block">Market Cap</p>
          </div>
          {displayCoins.slice(0, 20).map((coin: CoinProps, index: number) => (
            <CoinListItem
              key={coin.id}
              {...coin}
              index={index + 1}
              currency={currency}
            />
          ))}
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Homepage;
