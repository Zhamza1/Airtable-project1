"use client";
import AddStudentForm from "@/components/student/AddStudentForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function StudentsPage() {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Étudiants</h1>
                    <h4 className="text-lg font-light text-gray-500">
                        Vous pouvez gérer vos étudiants sur cette page.
                    </h4>
                </div>
                <Dialog>
                    <DialogTrigger asChild>   
                        <Button>Nouveau étudiant</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Nouvel étudiant</DialogTitle>
                            <DialogDescription>
                                Créez un nouvel étudiant en remplissant le formulaire ci-dessous.
                            </DialogDescription>
                        </DialogHeader>
                        <AddStudentForm />
                        <DialogFooter>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
