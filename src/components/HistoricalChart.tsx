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

// Register Chart.js components
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

// Custom plugin to set the background color of the canvas
const backgroundColorPlugin: Plugin = {
  id: "backgroundColorPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#131a2a"; // Set your desired background color here
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  },
};

// Register the custom plugin
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
    <div className="p-1 relative font-satoshi-regular w-11/12 md:w-1/3 max-h-80 mx-auto mt-8 flex items-center gap-1 flex-col">
      <select
        className="md:px-3 md:py-2  absolute left-[15%] top-[5%] rounded-lg text-white  bg-[#4c82fb]"
        onChange={handleSetDays}
      >
        <option value="30">30</option>
        <option value="90">90</option>
        <option value="180">180</option>
        <option value="365">365</option>
      </select>
      <Line
        className="rounded-xl"
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (${currency.toUpperCase()})`,
              data: chartData.data,
              borderColor: "#4c82fb", // Line color
              //   backgroundColor: "#4c82fb",
              tension: 0.3, // Smooth curves
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
                color: "white", // Changed text color to white
              },
            },
            y: {
              ticks: {
                color: "white", // Changed text color to white
              },
            },
          },
        }}
      />
    </div>
  );
};

export default HistoricalChart;
