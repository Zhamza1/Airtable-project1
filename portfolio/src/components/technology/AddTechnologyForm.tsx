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
import { technologySchema, TechnologySchemaType } from "@/schemas/technologySchema";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface AddTechnologyFormProps {
    initialData?: TechnologySchemaType;
    onSubmit: (data: TechnologySchemaType) => Promise<void>;
}

export function AddTechnologyForm({
                                      initialData,
                                      onSubmit,
                                  }: AddTechnologyFormProps) {
    const form = useForm<TechnologySchemaType>({
        resolver: zodResolver(technologySchema),
        defaultValues: initialData ?? { name: "" },
    });

    const handleForm = async (data: TechnologySchemaType) => {
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
                            <FormLabel htmlFor="tech-name">
                                Nom de la technologie
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="tech-name"
                                    placeholder="Ex. React"
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
