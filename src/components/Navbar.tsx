import { Link } from "react-router";
import { useCurrency } from "../contexts/CurrencyContext";

interface NavbarProps {
  handleCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Navbar({ handleCurrencyChange }: NavbarProps) {
  const { currency } = useCurrency();
  return (
    <div className=" items-center flex w-screen justify-around py-6   ">
      <Link to={"/"}>
        <h1 className="text-3xl font-satoshi-bold">
          Crypto<span className="text-[#4c82fb]  ">Data</span>
        </h1>
      </Link>
      <div className="md:flex gap-6 text-lg hidden">
        <button>Features</button>
        <button>Pricing</button>
        <button>Blog</button>
      </div>

      <div className="flex gap-3 items-center ">
        <select
          className="px-3 py-2 rounded-lg text-white  bg-[#131a2a]"
          value={currency.name}
          onChange={handleCurrencyChange}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
          <option value="pln">PLN</option>
        </select>
        <button className="rounded-lg bg-[#4c82fb] px-3 py-2">Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;
