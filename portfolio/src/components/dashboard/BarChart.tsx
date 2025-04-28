"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarGraphProps = {
  labels: string[];
  data: number[];
  title?: string;
};

export function BarGraph({ labels, data }: BarGraphProps) {
  return (
    <div className="rounded-xl">
      <Bar
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: "#60a5fa",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { 
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
             },
          },
        }}
      />
    </div>
  );
}