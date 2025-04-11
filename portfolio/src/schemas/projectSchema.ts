import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  technology: z.string(),
  link: z.string().url({ message: "L'URL est invalide" }),
  visuals: z.array(
    z.string().url({ message: "L'URL de l'image est invalide" })
  ),
  promotion: z.string(),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
