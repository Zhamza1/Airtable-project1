"use client";

import { useSession } from "next-auth/react"; // <-- ici
import { ProjectCardProps } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function ProjectCardFront({ projectData }: ProjectCardProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: handleLike, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: projectData.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors du like");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Projet liké avec succès !");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du like");
    },
  });

  const hasLiked = projectData.liked_by?.includes(session?.user?.email || "");

  return (
    <Card className="flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
      <CardHeader>
        <div className="relative w-full h-48 overflow-hidden rounded-md mb-4">
          {projectData.visuals?.[0] && projectData.visuals[0] !== "" ? (
            <Image
              src={projectData.visuals[0]}
              alt={projectData.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              Pas d'image
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-bold">{projectData.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-500 mb-4 line-clamp-3">{projectData.description}</p>

        <div className="flex flex-wrap gap-2">
          {projectData.list_technos?.map((techno: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {techno}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between items-center">
        {projectData.link && (
          <Link
            href={projectData.link}
            target="_blank"
            className="text-primary underline text-sm font-medium"
          >
            Voir le projet →
          </Link>
        )}

        <button
          onClick={() => handleLike()}
          disabled={isPending || hasLiked}
          className={`flex items-center gap-1 transition-colors ${
            hasLiked ? "text-red-600" : "text-gray-400 hover:text-red-600"
          } disabled:opacity-50`}
        >
          <Heart className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} />
          <span className="text-sm">{projectData.likes ?? 0}</span>
        </button>
      </CardFooter>
    </Card>
  );
}
