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
    <div className="w-full min-w-0 aspect-square flex items-center justify-center mx-auto max-w-[220px] sm:max-w-[300px] md:max-w-[350px]">
      <Doughnut
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
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        }}
      />
    </div>
  );
}