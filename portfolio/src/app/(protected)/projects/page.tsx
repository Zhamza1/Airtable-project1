"use client";
import AddProjectForm from "@/components/project/AddProjectForm";
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

export default function ProjectsPage() {
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
    </div>
  );
}
