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
  const percentage = change.toFixed(2);
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
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
      <div className="coin-grid-small coin-grid bg-[#131a2a]">
        <p>{index}</p>
        <div className="flex  gap-2">
          <img
            src={image}
            alt={name}
            style={{ width: "30px", height: "30px" }}
          />

          <p>
            {name}
            <span className="text-[#4c82fb] text-sm">
              {" "}
              {symbol.toUpperCase()}
            </span>
          </p>
        </div>

        <p>
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
