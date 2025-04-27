"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsList } from "@/lib/api";
import ProjectCardFront from "@/components/project/ProjectCardFront";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "@/components/Header";
import { Hero } from "@/components/HeroSection";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const records = await projectsList();
      return records.map((record: any) => ({
        id: record.id,
        ...record.fields,
        visuals: record.fields.visuals?.map((visual: any) => visual.url) || [],
      }));
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = data?.filter((project: Project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>Impossible de récupérer les projets...</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <Header />

      <section id="about">
        <Hero />
      </section>

      <section id="projects" className="pt-20">
        <div className="my-8 flex justify-center">
          <Input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        {filteredProjects?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Aucun projet trouvé pour "{searchTerm}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: Project) => (
              <ProjectCardFront key={project.id} projectData={project} />
            ))}
          </div>
        )}
      </section>

      <section id="footer" className="mt-20">
        <footer className="text-center text-gray-500 py-10">
          © {new Date().getFullYear()} IW. Tous droits réservés.
        </footer>
      </section>
    </main>
  );
}
