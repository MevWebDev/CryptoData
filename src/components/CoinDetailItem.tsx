interface CoinDetailItemProps {
  text: string;
  value: string | number;
  style?: string;
}

function CoinDetailItem({ text, value, style }: CoinDetailItemProps) {
  return (
    <div className={`flex justify-between bg-[#131a2a] p-3 ${style}`}>
      <p>{text}</p>
      <p>{value}</p>
    </div>
  );
}

export default CoinDetailItem;
