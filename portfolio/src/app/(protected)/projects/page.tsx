"use client";
import AddProjectForm from "@/components/project/AddProjectForm";
import ProjectCard from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectsList } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsPage() {
  const {
    data: projects,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsList,
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
        <Dialog>
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
            <AddProjectForm />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {projects &&
          projects.map((project: any, index: number) => (
            <ProjectCard key={index} projectData={project.fields} />
          ))}
      </div>
    </div>
  );
}
