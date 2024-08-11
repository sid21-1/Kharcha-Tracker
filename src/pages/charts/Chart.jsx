import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import sourcedata from "../../../sourcedata.json";
import useChartComponent from "../../hooks/useChartComponent";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const chartLogic = useChartComponent();
  // console.log(useChartComponent);
  const handleClick = () => {
    console.log(useChartComponent);
  };

  useEffect(() => {
    setChartData(sourcedata);
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <button onClick={handleClick}>Click</button>
      {/* <div className="w-full h-screen flex flex-row items-center justify-center bg-[#EEF3F9]">
        <div className=" flex justify-center p-8 mr-14 bg-[#ffffff] shadow-2xl rounded h-[40vh] w-[50vw]">
          <Bar data={chartData} options={options} />
        </div>
        <div className=" flex justify-center p-8 bg-[#ffffff] shadow-2xl rounded  h-[40vh] w-[50vw]">
          <Doughnut data={chartData} options={options} />
        </div>
      </div> */}
    </>
  );
};

export default Chart;
