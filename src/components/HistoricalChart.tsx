import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { ChartData } from "./CoinDetails";

interface HistoricalChartParams {
  coinId: string;
  currency: string;
  chartData: ChartData;
  setDays: (days: number) => void;
}

const backgroundColorPlugin: Plugin = {
  id: "backgroundColorPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#131a2a";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  },
};

ChartJS.register(backgroundColorPlugin);

const HistoricalChart = ({
  coinId,
  currency,
  chartData,
  setDays,
}: HistoricalChartParams) => {
  function handleSetDays(event: React.ChangeEvent<HTMLSelectElement>) {
    setDays(Number(event.target.value));
  }
  return (
    <div className="p-1 relative font-satoshi-regular w-11/12 md:w-1/3 max-h-80 mx-auto mt-8 flex items-center flex-col">
      <select
        aria-label="select-day-range"
        name="select-day-range"
        className="px-2 py-1 md:px-3 md:py-2 mb-4 self-start rounded-lg text-white  bg-[#4c82fb] hover:bg-[#3573f8] font-satoshi-bold"
        onChange={handleSetDays}
      >
        <option value="30">30 days</option>
        <option value="90">90 days</option>
        <option value="180">180 days</option>
        <option value="365">365 days</option>
      </select>
      <Line
        className="rounded-xl"
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (${currency.toUpperCase()})`,
              data: chartData.data,
              borderColor: "#4c82fb",

              tension: 0.3,
              pointRadius: 0,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default HistoricalChart;
