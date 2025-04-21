import { z } from "zod";

export const studentSchema = z.object({
    firstName: z.string().min(1, { message: "Le prénom est requis" }),
    lastName: z.string().min(1, { message: "Le nom est requis" }),
    email: z.string().email({ message: "L'email est invalide" }),
    promotion: z.enum([
        "Première année",
        "Deuxième année",
        "Troisième année",
        "Quatrième année",
        "Cinquième année",
    ], {
        message: "La promotion doit être comprise entre 'Première année' et 'Cinquième année'"
    }),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
