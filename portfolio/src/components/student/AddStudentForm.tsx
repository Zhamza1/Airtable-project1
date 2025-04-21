import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { studentSchema, StudentSchemaType } from "@/schemas/studentSchema";

export default function AddStudentForm() {
    const form = useForm<StudentSchemaType>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            promotion: "Première année", // Valeur par défaut pour la promotion
        },
    });

    const onSubmit = (data: StudentSchemaType) => {
        console.log("Données de l'étudiant :", data);
        // Vous pouvez ici gérer l'envoi des données vers votre API ou autre traitement
    };

    return (
        <Form>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName">Prénom</label>
                    <input id="firstName" type="text" {...form.register("firstName")} />
                    {form.formState.errors.firstName && (
                        <p>{form.formState.errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName">Nom</label>
                    <input id="lastName" type="text" {...form.register("lastName")} />
                    {form.formState.errors.lastName && (
                        <p>{form.formState.errors.lastName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...form.register("email")} />
                    {form.formState.errors.email && (
                        <p>{form.formState.errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="promotion">Promotion</label>
                    <select id="promotion" {...form.register("promotion")}>
                        <option value="Première année">Première année</option>
                        <option value="Deuxième année">Deuxième année</option>
                        <option value="Troisième année">Troisième année</option>
                        <option value="Quatrième année">Quatrième année</option>
                        <option value="Cinquième année">Cinquième année</option>
                    </select>
                    {form.formState.errors.promotion && (
                        <p>{form.formState.errors.promotion.message}</p>
                    )}
                </div>

                <button type="submit">Ajouter l'étudiant</button>
            </form>
        </Form>
    );
}
