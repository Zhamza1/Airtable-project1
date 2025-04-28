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
import { categorySchema, CategorySchemaType } from "@/schemas/categorySchema";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface AddCategoryFormProps {
    initialData?: CategorySchemaType;
    onSubmit: (data: CategorySchemaType) => Promise<void>;
}

export function AddCategoryForm({
                                    initialData,
                                    onSubmit,
                                }: AddCategoryFormProps) {
    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData ?? { name: "" },
    });

    const handleForm = async (data: CategorySchemaType) => {
        await onSubmit(data);
        form.reset(initialData ?? undefined);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForm)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="category-name">
                                Nom de la catégorie
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="category-name"
                                    placeholder="Ex. Front-end"
                                />
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
