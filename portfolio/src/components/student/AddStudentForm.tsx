"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";
import {Button} from "@/components/ui/button";
import {DialogFooter} from "@/components/ui/dialog";

export default function AddStudentForm() {
    const form = useForm<StudentSchemaType>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            promotion: "Première année",
        },
    });

    const onSubmit = (data: StudentSchemaType) => {
        console.log("Données de l'étudiant :", data);
        // …envoi vers l'API, etc.
    };

    return (
        // On passe tout l'objet `form` pour alimenter FormField via le contexte
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="firstName">Prénom</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    id="firstName"
                                    placeholder="Jean"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="lastName">Nom</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    id="lastName"
                                    placeholder="Dupont"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    id="email"
                                    type="email"
                                    placeholder="jean.dupont@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="promotion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="promotion">Promotion</FormLabel>
                            <FormControl>
                                <select {...field} id="promotion">
                                    <option value="Première année">Première année</option>
                                    <option value="Deuxième année">Deuxième année</option>
                                    <option value="Troisième année">Troisième année</option>
                                    <option value="Quatrième année">Quatrième année</option>
                                    <option value="Cinquième année">Cinquième année</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Bouton de soumission */}
                <DialogFooter>
                    <Button type="submit">Enregistrer</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
