import {z} from "zod";

export const technologySchema = z.object({
    name: z.string().min(1, { message: "Le nom de la technologie est requis" }),
});

export type TechnologySchemaType = z.infer<typeof technologySchema>;