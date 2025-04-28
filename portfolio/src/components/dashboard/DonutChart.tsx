"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type ProjectsDonutProps = {
  labels: string[];
  data: number[];
};

export function DonutChart({ labels, data }: ProjectsDonutProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Doughnut
        className="w-full h-full"
        data={{
          labels,
          datasets: [
            {
              label: "Projects by Category",
              data,
              backgroundColor: [
                "#60a5fa",
                "#f472b6",
                "#fbbf24",
                "#34d399",
                "#a78bfa",
                "#f87171",
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        }}
        width={undefined}
        height={undefined}
      />
    </div>
  );
}