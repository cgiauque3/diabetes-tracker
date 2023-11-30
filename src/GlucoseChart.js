import React from "react";
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

const GlucoseChart = ({ readings, limits }) => {
  const labels = readings.map(
    (reading) =>
      `${reading.timestamp.getDate()}/${reading.timestamp.getMonth() + 1}`
  );

  const glucoseData = readings.map((reading) => reading.value);
  const upperLimitLine = Array(readings.length).fill(limits.upper);
  const lowerLimitLine = Array(readings.length).fill(limits.lower);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Day/Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Glucose Level (mg/dL)",
        },
      },
    },
  };

  const data = {
    labels, // Use the labels array for the x-axis
    datasets: [
      {
        label: "Glucose Levels",
        data: glucoseData, // Use the glucoseData array for the y-axis
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Upper Limit",
        data: upperLimitLine,
        fill: false,
        borderColor: "red",
        borderDash: [5, 5],
      },
      {
        label: "Lower Limit",
        data: lowerLimitLine,
        fill: false,
        borderColor: "blue",
        borderDash: [5, 5],
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default GlucoseChart;
