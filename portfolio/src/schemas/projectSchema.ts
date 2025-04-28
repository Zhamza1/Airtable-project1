import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  technology: z
    .string()
    .min(1, { message: "Au moins une technologie est requise" }),
  link: z.string().url({ message: "L'URL est invalide" }),
  visuals: z
    .array(z.instanceof(File))
    .min(1, { message: "Au moins un visuel est requis" }),
  class: z.string().min(1, { message: "La classe est requise" }),
  creator: z.string().min(1, { message: "Le créateur est requis" }),
  student: z.string().min(1, { message: "L'étudiant est requis" }),
  category: z.string().min(1, { message: "La catégorie est requise" }),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
