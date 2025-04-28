import { projectSchema, ProjectSchemaType } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function AddProjectForm() {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      technology: "",
      link: "",
      visuals: [],
      class: "",
      creator: "",
      student: "",
      category: "",
    },
  });

  const {
    isPending,
    mutate: projectCreate,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: ProjectSchemaType) => {
      // Upload visuals
      const attachments = await Promise.all(
        (data.visuals as File[]).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const json = await res.json();
          return { url: json.url, filename: file.name };
        })
      );

      // Prepare payload
      const payload = {
        name: data.name,
        description: data.description,
        technology:
          typeof data.technology === "string"
            ? data.technology.split(",").map((t) => t.trim())
            : data.technology,
        link: data.link,
        visuals: attachments,
        class: data.class,
        creator: data.creator,
        student: data.student,
        category: data.category,
      };

      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(
          error.message || "Erreur lors de la création du projet"
        );
      }
      return res.json();
    },
    onSuccess: (response) => {
      console.log("Projet créé avec succès", response);
      form.reset();
      setFilePreviews([]);
    },
  });

  // Handle file selection and preview
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    form.setValue("visuals", fileArray as any);
    setFilePreviews(fileArray.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = (values: ProjectSchemaType) => {
    projectCreate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isError && (
          <Alert variant="destructive">
            <AlertDescription>{(error as Error).message}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input placeholder="Nom du projet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input placeholder="React, Node.js, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Visuels</FormLabel>
          <FormControl>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </FormControl>
          <div className="flex space-x-2 mt-2">
            {filePreviews.map((src) => (
              <img
                key={src}
                src={src}
                alt="Preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <FormControl>
                <Input placeholder="Classe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Créateur</FormLabel>
              <FormControl>
                <Input placeholder="ID créateur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="student"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Étudiant</FormLabel>
              <FormControl>
                <Input placeholder="ID étudiant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input placeholder="ID catégorie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isPending ? "Création en cours..." : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
