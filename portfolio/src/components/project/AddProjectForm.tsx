import { projectSchema, ProjectSchemaType } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MultiSelect } from "../MultiSelect";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddProjectForm({
  technologiesData,
  categoriesData,
  studentsData,
  setOpen,
}: {
  technologiesData: { id: string; name: string }[];
  categoriesData: { id: string; name: string }[];
  studentsData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    promotion: string;
  }[];
  setOpen: (open: boolean) => void;
}) {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      technology: [],
      link: "",
      visuals: [],
      class: "",
      student: [],
      category: [],
    } as any,
  });

  const {
    isPending,
    mutate: projectCreate,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: ProjectSchemaType) => {
      const attachments = (data.visuals as File[]).map(async (file) => {
        return { url: "https://v5.airtableusercontent.com/" + file.name };
      });

      const payload = {
        ...data,
        visuals: attachments,
      };

      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur lors de la création du projet");
      }
      return res.json();
    },
    onSuccess: (_response) => {
      toast.success("Projet créé avec succès !");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    form.setValue("visuals", fileArray as any);
    setFilePreviews(fileArray.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = (values: ProjectSchemaType) => projectCreate(values);

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
                <MultiSelect
                  options={technologiesData.map((tech) => ({
                    label: tech.name,
                    value: tech.id,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
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
        <FormField
          control={form.control}
          name="visuals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visuels</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
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
              </div>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="class">Classe</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="class" className="w-full">
                    <SelectValue placeholder="Sélectionner la classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Première Année">
                      Première Année
                    </SelectItem>
                    <SelectItem value="Deuxième Année">
                      Deuxième Année
                    </SelectItem>
                    <SelectItem value="Troisième Année">
                      Troisième Année
                    </SelectItem>
                    <SelectItem value="Quatrième Année">
                      Quatrième Année
                    </SelectItem>
                    <SelectItem value="Cinquième Année">
                      Cinquième Année
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                <MultiSelect
                  options={studentsData.map((student) => ({
                    label: student.firstName + " " + student.lastName,
                    value: student.id,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
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
                <MultiSelect
                  options={categoriesData.map((tech) => ({
                    label: tech.name,
                    value: tech.id,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  placeholder="Sélectionner une catégorie"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
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
