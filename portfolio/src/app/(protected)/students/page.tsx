"use client";

import { useEffect, useState } from "react";
import AddStudentForm from "@/components/student/AddStudentForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { StudentSchemaType } from "@/schemas/studentSchema";

export type Student = StudentSchemaType & { id: string };

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [createOpen, setCreateOpen] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/students");
                if (!res.ok) throw new Error((await res.json()).message);
                setStudents(await res.json());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleCreate = async (data: StudentSchemaType) => {
        const res = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setStudents((prev) => [...prev, payload]);
        toast.success("Étudiant créé !");
        setCreateOpen(false);
    };

    const handleUpdate = async (data: StudentSchemaType) => {
        if (!editingStudent) return;
        const res = await fetch(`/api/students/${editingStudent.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
            return;
        }
        setStudents((prev) =>
            prev.map((s) => (s.id === payload.id ? payload : s))
        );
        toast.success("Étudiant mis à jour !");
        setEditingStudent(null);
    };

    const confirmDelete = (student: Student) => {
        setStudentToDelete(student);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!studentToDelete) return;
        const res = await fetch(`/api/students/${studentToDelete.id}`, {
            method: "DELETE",
        });
        const payload = await res.json();
        if (!res.ok) {
            toast.error(payload.message);
        } else {
            setStudents((prev) =>
                prev.filter((s) => s.id !== studentToDelete.id)
            );
            toast.success("Étudiant supprimé !");
        }
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2">
                <div>
                    <h1 className="text-2xl font-bold">Étudiants</h1>
                    <p className="text-gray-500">Gérez vos étudiants ici.</p>
                </div>
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Nouveau étudiant</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Nouveau étudiant</DialogTitle>
                            <DialogDescription>
                                Ajoutez un étudiant en remplissant le formulaire.
                            </DialogDescription>
                        </DialogHeader>
                        <AddStudentForm onSubmit={handleCreate} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="px-4 py-2">{loading ? (<p>Chargement…</p>) : error ? (<p className="text-red-600">Erreur : {error}</p>) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {["Prénom", "Nom", "Email", "Promotion", "Actions"].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            {h}
                                        </th>
                                    )
                                )}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td className="px-4 py-3">{s.firstName}</td>
                                    <td className="px-4 py-3">{s.lastName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {s.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {s.promotion}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => setEditingStudent(s)}>Modifier</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => confirmDelete(s)}>Supprimer</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Dialog
                open={!!editingStudent}
                onOpenChange={(o) => !o && setEditingStudent(null)}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifier étudiant</DialogTitle>
                        <DialogDescription>
                            Mettez à jour les informations de l'étudiant.
                        </DialogDescription>
                    </DialogHeader>
                    {editingStudent && (
                        <AddStudentForm
                            initialData={editingStudent}
                            onSubmit={handleUpdate}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onOpenChange={(o) => !o && setDeleteDialogOpen(false)}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Supprimer l'étudiant ?</DialogTitle>
                        <DialogDescription>
                            Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
