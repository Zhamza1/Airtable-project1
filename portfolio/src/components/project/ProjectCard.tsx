import { ProjectCardProps } from "@/types/project";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "../ui/badge";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ProjectComment from "./ProjectComment";
import ProjectVisualsCarousel from "./ProjectVisualsCarousel";

export default function ProjectCard({ projectData }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{projectData.name}</CardTitle>
        <CardDescription>{projectData.description}</CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="h-full">
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <p className="text-md text-slate-500 w-24">Créateur:</p>
              <p>{projectData.creator_name}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-md text-slate-500 w-24">Classe:</p>
              <p>{projectData.class}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-md text-slate-500 w-24">Étudiants:</p>
              <span className="flex flex-col">
                {projectData.student_names?.map(
                  (student: string, index: number) => (
                    <p key={index}>{student}</p>
                  )
                )}
              </span>
            </div>
            <div className="flex gap-1">
              <p className="text-md text-slate-500 w-24">Catégorie:</p>
              <p>{projectData.category_name}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-md text-slate-500 w-24">Url:</p>
              <Link href={projectData.link} className="text-blue-800 underline">
                {projectData.link}
              </Link>
            </div>
          </div>
          <div className="h-1/2 p-3">
            <ProjectVisualsCarousel
              images={projectData.visuals}
              width={90}
              height={30}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-3">
          <span className="flex gap-1 justify-center">
            <ThumbsUp className="w-6 text-red-800" />
            <p className="text-lg text-slate-500">
              J'aimes : {projectData.likes}
            </p>
          </span>

          <Dialog>
            <DialogTrigger asChild>
              <span className="flex gap-1 justify-center cursor-pointer box-border transition-transform duration-100 ease-out hover:-translate-y-1">
                <MessageSquare className="w-6 text-blue-800" />
                <p className="text-lg text-slate-500 underline">
                  Commentaires : {projectData.comments?.length}
                </p>
              </span>
            </DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle>
                  Commentaires du projet {projectData.name}
                </DialogTitle>
              </DialogHeader>
              {projectData.author_comment?.map((comment, index) => {
                const author = comment.split(":")[0];
                const content = comment.split(":")[1];
                return (
                  <ProjectComment
                    key={index}
                    author={author}
                    content={content}
                  />
                );
              })}
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <p className="text-sm font-light">Technologies :</p>
          <div className="flex flex-wrap gap-2">
            {projectData.list_technos?.map((techno: string) => (
              <Badge variant={"secondary"} key={techno}>
                {techno}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
