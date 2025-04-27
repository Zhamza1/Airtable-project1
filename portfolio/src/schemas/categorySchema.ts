import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Le nom de la catégorie est requis" }),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

