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
      <div className="md:flex gap-6 text-lg hidden hover:">
        <button>Features</button>
        <button>Pricing</button>
        <button>Blog</button>
      </div>

      <div className="flex gap-3 items-center ">
        <select
          aria-label="select-currency"
          name="select-currency"
          className="px-3 py-2 rounded-lg text-white  bg-[#131a2ada] hover:bg-[#1d273a] font-satoshi-bold cursor-pointer"
          value={currency.name}
          onChange={handleCurrencyChange}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
          <option value="pln">PLN</option>
        </select>
        <button className=" font-satoshi-bold rounded-lg bg-[#4c82fb] hover:bg-[#3573f8] px-3 py-2">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
