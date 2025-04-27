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
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface AddStudentFormProps {
    initialData?: StudentSchemaType;
    onSubmit: (data: StudentSchemaType) => Promise<void>;
}

export default function AddStudentForm({
                                           initialData,
                                           onSubmit,
                                       }: AddStudentFormProps) {
    const form = useForm<StudentSchemaType>({
        resolver: zodResolver(studentSchema),
        defaultValues: initialData ?? {
            firstName: "",
            lastName: "",
            email: "",
            promotion: "Première Année",
        },
    });

    const handleForm = async (data: StudentSchemaType) => {
        await onSubmit(data);
        form.reset(initialData ?? undefined);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForm)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="firstName">Prénom</FormLabel>
                            <FormControl>
                                <Input {...field} id="firstName" placeholder="Alain" />
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
                                <Input {...field} id="lastName" placeholder="Popito" />
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
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    placeholder="alain.popito@gmail.com"
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
                                <select
                                    {...field}
                                    id="promotion"
                                    className="border rounded p-2 w-full"
                                >
                                    <option>Première Année</option>
                                    <option>Deuxième Année</option>
                                    <option>Troisième Année</option>
                                    <option>Quatrième Année</option>
                                    <option>Cinquième Année</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">
                        {initialData ? "Enregistrer les modifications" : "Enregistrer"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
