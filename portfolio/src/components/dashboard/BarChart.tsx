"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarGraphProps = {
  labels: string[];
  data: number[];
  title?: string;
};

export function BarGraph({ labels, data, title }: BarGraphProps) {
  return (
    <div className="rounded-xl p-2 sm:p-4 w-full min-w-0">
      {title && (
        <h3 className="font-semibold mb-2 text-base sm:text-lg text-center">{title}</h3>
      )}
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
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                callback: function (value) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                  return null;
                },
              },
            },
          },
        }}
        height={250}
      />
    </div>
  );
}