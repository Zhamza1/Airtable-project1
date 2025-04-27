import {z} from "zod";

export const studentSchema = z.object({
    firstName: z.string().min(1, {message: "Le prénom est requis"}),
    lastName: z.string().min(1, {message: "Le nom est requis"}),
    email: z.string().email({message: "L'email est invalide"}),
    promotion: z.enum([
        "Première Année",
        "Deuxième Année",
        "Troisième Année",
        "Quatrième Année",
        "Cinquième Année",
    ], {
        message: "La promotion doit être comprise entre 'Première Année' et 'Cinquième Année'"
    }),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
