"use client";
import AddProjectForm from "@/components/project/AddProjectForm";
import ProjectCard from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectsList } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ProjectsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsList,
  });
  const { data: technologies } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => fetch("/api/technology").then((res) => res.json()),
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/category").then((res) => res.json()),
  });
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: () => fetch("/api/students").then((res) => res.json()),
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Projets</h1>
          <h4 className="text-lg font-light text-gray-500">
            Vous pouvez gérer vos projets sur cette page.
          </h4>
        </div>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Nouveau projet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nouveau projet</DialogTitle>
              <DialogDescription>
                Créez un nouveau projet en remplissant le formulaire ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <AddProjectForm
              technologiesData={technologies}
              categoriesData={categories}
              studentsData={students}
              setOpen={setAddModalOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {projects &&
          projects.map((project: any, index: number) => (
            <ProjectCard
              key={index}
              projectData={project.fields}
              projectId={project.id}
            />
          ))}
      </div>
    </div>
  );
}
