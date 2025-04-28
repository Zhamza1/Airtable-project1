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
    <div className="rounded-xl bg-green-100 dark:bg-green-900/40 p-2 flex flex-col items-center justify-center shadow border border-green-300 dark:border-green-700 w-full">
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
    <div className="flex flex-col min-h-content">
      <div className="flex-1 px-2 sm:px-4 md:px-6 pb-4 flex flex-col gap-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-4">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-0 h-full w-full min-w-0">
            <StatCard label="Projets" value={stats.totalProjects} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-0 h-full w-full min-w-0">
            <StatCard label="Likes" value={stats.totalLikes} />
          </div>
          {stats.mostLikedPromotion && (
            <MostLikedPromotion
              name={stats.mostLikedPromotion.name}
              likes={stats.mostLikedPromotion.likes}
            />
          )}
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 gap-y-4 w-full">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 w-full min-w-0 flex items-center justify-center">
            <DonutChart
              labels={Object.keys(stats.projectsByCategory)}
              data={Object.values(stats.projectsByCategory)}
            />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 w-full min-w-0">
            <TopLikedProjects projects={stats.topProjects} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 w-full min-w-0 flex flex-col">
            <h3 className="font-semibold mb-2">Technologies les plus utilisées</h3>
            <BarGraph
              labels={Object.keys(stats.technologiesUsage)}
              data={Object.values(stats.technologiesUsage)}
            />
          </div>
        </div>
        {/* Comments & Top Students */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-4 w-full">
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 overflow-auto w-full min-w-0">
            <MostRecentComments comments={stats.mostRecentComments} />
          </div>
          <div className="bg-white dark:bg-muted/50 rounded-xl shadow p-2 overflow-auto w-full min-w-0">
            <TopStudents students={stats.topStudents} />
          </div>
        </div>
      </div>
    </div>
  );
}