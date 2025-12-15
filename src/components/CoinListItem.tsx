import { Link } from "react-router";
import { CoinProps } from "./App";
import "./CoinListItem.css";

interface CoinListItemProps extends CoinProps {
  currency: { name: string; symbol: string };
}

function CoinListItem({
  name,
  symbol,
  price,
  change,
  mcap,
  image,
  index,
  currency,
  id,
}: CoinListItemProps) {
  const percentage = change?.toFixed(2);
  const formattedPrice =
    price >= 1
      ? price.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : price.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 5,
        });
  const formattedMCap = mcap.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  const color = (number: string) => {
    return parseFloat(number) > 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <Link to={`/coin/${id}`} state={{ currency }}>
      <div className="coin-grid text-md  bg-[#131a2a] hover:bg-[#131a2abd]">
        <p>{index}</p>
        <div className="flex gap-3 items-center">
          <img
            src={image}
            alt={name}
            style={{ width: "30px", height: "30px" }}
          />

          <div className="flex flex-col">
            {name}&nbsp;
            <span className="text-[#4c82fb] text-sm">
              {" "}
              {symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <p className=" md:justify-self-start">
          {formattedPrice}&nbsp;{currency.symbol}
        </p>
        <p className={`${color(percentage)}`}>{percentage}%</p>
        <p className="hidden md:block">
          {formattedMCap}&nbsp;{currency.symbol}
        </p>
      </div>
    </Link>
  );
}

export default CoinListItem;
