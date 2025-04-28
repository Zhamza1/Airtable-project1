import { projectSchema, ProjectSchemaType } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {projectSchema, ProjectSchemaType} from "@/schemas/projectSchema";

export default function AddProjectForm() {
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      technology: "",
      link: "",
      visuals: [],
      class: "",
    },
  });
  const {
    mutate: createProject,
    error,
    isError,
    isPending,
  } = useMutation<ProjectSchemaType>({
    mutationFn: () => {},
    mutationKey: ["newProject"],
    onSuccess: (response) => {
      console.log("Login successful", response);
    },
  });

  function onSubmit(values: ProjectSchemaType) {
    createProject(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Email ou mot de passe incorrect.
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Saisir le nom du projet"
                  type="text"
                  {...field}
                />
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
                <Input
                  placeholder="Saisir la description du projet"
                  type="text"
                  {...field}
                />
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
              <FormLabel>Technologie</FormLabel>
              <FormControl>
                <Input
                  placeholder="Saisir la technologie"
                  type="text"
                  {...field}
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
                <Input placeholder="Saisir le lien" type="text" {...field} />
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
                  placeholder="Saisir les visuels"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <FormControl>
                <Input placeholder="Saisir la classe" type="text" {...field} />
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
