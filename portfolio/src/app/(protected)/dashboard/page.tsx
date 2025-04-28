"use client";
import { useEffect, useState } from "react";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopLikedProjects } from "@/components/dashboard/TopFive";
import { BarGraph } from "@/components/dashboard/BarChart";
import { MostRecentComments } from "@/components/dashboard/MostRecentComments";
import { TopStudents } from "@/components/dashboard/TopStudents";

function MostLikedPromotion({ name, likes }: { name: string; likes: number }) {
  return (
    <div className="rounded-xl bg-green-100 dark:bg-green-900/40 p-2 flex flex-col items-center justify-center shadow border border-green-300 dark:border-green-700">
      <span className="text-xs text-green-700 dark:text-green-300 mb-1">Promotion avec le plus de likes</span>
      <span className="text-lg font-bold text-green-900 dark:text-green-100">{name}</span>
      <span className="text-green-700 dark:text-green-300">{likes} likes</span>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <span className="text-lg text-muted-foreground">Chargement du tableau de bord...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto px-6 pb-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-0 h-full">
            <StatCard label="Projets" value={stats.totalProjects} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-0 h-full">
            <StatCard label="Likes" value={stats.totalLikes} />
          </div>
          {stats.mostLikedPromotion && (
            <MostLikedPromotion
              name={stats.mostLikedPromotion.name}
              likes={stats.mostLikedPromotion.likes}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1 min-h-0">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 min-h-0 col-span-1 h-full">        
            <DonutChart
              labels={Object.keys(stats.projectsByCategory)}
              data={Object.values(stats.projectsByCategory)}
            />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 min-h-0 col-span-1 h-full">
            <TopLikedProjects projects={stats.topProjects} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 min-h-0 col-span-2 h-full">
            <h3 className="font-semibold mb-2">Technologies les plus utilisées</h3>
            <BarGraph
              labels={Object.keys(stats.technologiesUsage)}
              data={Object.values(stats.technologiesUsage)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 overflow-auto min-h-0 h-full">
            <MostRecentComments comments={stats.mostRecentComments} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 overflow-auto min-h-0 h-full">
            <TopStudents students={stats.topStudents} />
          </div>
        </div>
      </div>
    </div>
  );
}